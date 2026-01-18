import { ArrowLeft, ArrowRight, Settings, BookOpen, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Dealing with Variations and Unforeseen Issues - Module 5.3.5 | Level 2 Electrical Course";
const DESCRIPTION = "Learn to manage project variations and unexpected issues effectively while maintaining safety, quality, and compliance standards.";

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
              <span className="text-white/60">Section 5.3.5</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Dealing with Variations and Unforeseen Issues
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed">
              Learn to manage project changes and unexpected challenges effectively while maintaining safety, quality, and compliance standards.
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
                  <span>Record all changes formally with written approval.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-elec-yellow mt-1 flex-shrink-0" />
                  <span>Stop work if safety is compromised by unforeseen issues.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-elec-yellow mt-1 flex-shrink-0" />
                  <span>Communicate changes to all affected parties immediately.</span>
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
                No matter how well a project is planned, variations and unforeseen issues will always arise. These may include design changes, unexpected site conditions, or delays caused by other trades. The key is not to avoid them — which is impossible — but to manage them effectively so that safety, quality, and deadlines are not compromised.
              </p>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <div className="flex items-start gap-3">
                  <Settings className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-elec-yellow mb-2">Why This Matters</p>
                    <p className="text-sm text-white/80">
                      Studies show that 75% of construction projects experience significant variations, with poorly managed changes causing 40% of project delays and 35% of cost overruns.
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-white/70">
                <strong className="text-white">Industry Standard:</strong> JCT contracts and NEC frameworks require systematic variation management to maintain legal compliance and project governance.
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
                <li>Recognise common causes of variations and unforeseen issues on site.</li>
                <li>Apply methods to manage and record changes.</li>
                <li>Communicate effectively when issues arise.</li>
                <li>Understand how variations affect timescales and costs.</li>
                <li>Work flexibly while maintaining compliance with BS 7671 and safety standards.</li>
              </ul>
            </div>
          </section>

          {/* What Are Variations */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              What Are Variations?
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Variations are fundamental changes that deviate from the original project scope and require systematic management.
              </p>

              <div className="p-4 rounded-lg bg-card/50 border border-white/10">
                <p className="font-medium text-white mb-3">Core Definition:</p>
                <p className="text-sm text-white/80 mb-4">Any change to the agreed design, scope, or programme that differs from the original contract or specification.</p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-white mb-2">Design Variations:</p>
                    <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                      <li>Client requests additional sockets or switches</li>
                      <li>Moving lighting positions for aesthetic reasons</li>
                      <li>Upgrading cable sizes for increased loads</li>
                      <li>Changing containment routes</li>
                      <li>Adding emergency lighting requirements</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-2">Scope Variations:</p>
                    <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                      <li>Additional floors or areas to be serviced</li>
                      <li>Increased power requirements for equipment</li>
                      <li>Extra data and communication installations</li>
                      <li>Fire alarm system extensions</li>
                      <li>Temporary power supply requirements</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500/50">
                <p className="font-medium text-green-400 mb-2">Financial Impact</p>
                <p className="text-sm text-white/80">
                  Well-managed variations can actually improve project profitability, while poorly managed ones can result in losses of 10-20% of contract value.
                </p>
              </div>
            </div>
          </section>

          {/* Variation Classification */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Variation Classification
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Understanding variation categories helps determine appropriate response and management strategies:
              </p>

              <div className="grid sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                  <h3 className="font-medium text-green-400 mb-2">Minor Variations</h3>
                  <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                    <li>Single socket additions</li>
                    <li>Switch position adjustments</li>
                    <li>Cable colour changes</li>
                    <li>Minor route modifications</li>
                  </ul>
                  <p className="text-xs text-green-400 mt-2">Impact: &lt; 2% project value</p>
                </div>

                <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                  <h3 className="font-medium text-yellow-400 mb-2">Moderate Variations</h3>
                  <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                    <li>Room layout changes</li>
                    <li>Panel board relocations</li>
                    <li>Additional circuits</li>
                    <li>Lighting scheme changes</li>
                  </ul>
                  <p className="text-xs text-yellow-400 mt-2">Impact: 2-10% project value</p>
                </div>

                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                  <h3 className="font-medium text-red-400 mb-2">Major Variations</h3>
                  <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                    <li>Complete system redesign</li>
                    <li>Additional building areas</li>
                    <li>Load increase requiring infrastructure changes</li>
                    <li>Specification upgrades</li>
                  </ul>
                  <p className="text-xs text-red-400 mt-2">Impact: &gt; 10% project value</p>
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

          {/* Unforeseen Issues */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Unforeseen Issues
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Unforeseen issues are circumstances that could not have been reasonably anticipated during planning:
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-card/50 border border-white/10">
                  <p className="font-medium text-green-400 mb-3">Hidden Site Conditions</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-white mb-2">Structural Discoveries:</p>
                      <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                        <li>Steel beams blocking planned cable routes</li>
                        <li>Concrete thickness preventing core drilling</li>
                        <li>Asbestos-containing materials in ceiling voids</li>
                        <li>Load-bearing walls affecting panel locations</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white mb-2">Environmental Factors:</p>
                      <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                        <li>Waterlogged ground conditions</li>
                        <li>Rock formations requiring specialist equipment</li>
                        <li>Contaminated soil requiring special handling</li>
                        <li>Protected wildlife areas affecting access</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-card/50 border border-white/10">
                  <p className="font-medium text-elec-yellow mb-3">Supply Chain and Material Issues</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-white mb-2">Material Challenges:</p>
                      <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                        <li>Material shortages due to global supply issues</li>
                        <li>Late deliveries affecting critical path activities</li>
                        <li>Quality defects requiring replacement materials</li>
                        <li>Discontinued products requiring design changes</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white mb-2">Mitigation Strategies:</p>
                      <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                        <li>Identify alternative suppliers and products</li>
                        <li>Maintain buffer stock for critical items</li>
                        <li>Develop substitute material specifications</li>
                        <li>Communicate lead time issues early</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-card/50 border border-white/10">
                  <p className="font-medium text-purple-400 mb-3">External Dependencies and Delays</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-white mb-2">Weather-Related Delays:</p>
                      <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                        <li>Extreme weather preventing external work</li>
                        <li>Flooding affecting site access</li>
                        <li>High winds restricting crane operations</li>
                        <li>Temperature extremes affecting materials</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white mb-2">Third Party Dependencies:</p>
                      <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                        <li>Other trades not completing work on time</li>
                        <li>Utility company connection delays</li>
                        <li>Planning permission modifications</li>
                        <li>Building control inspection delays</li>
                      </ul>
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

          {/* Risks of Poor Management */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Risks of Poor Variation Management
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Understanding the full impact of poor variation management emphasises the importance of systematic approaches:
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                  <h3 className="font-medium text-red-400 mb-3">Safety and Compliance Risks</h3>
                  <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                    <li><strong>Safety Compromises:</strong> Rushed changes bypassing risk assessments</li>
                    <li><strong>Regulation Breaches:</strong> Non-compliance with BS 7671 or building regulations</li>
                    <li><strong>Certification Issues:</strong> Invalid test certificates for modified installations</li>
                    <li><strong>Insurance Implications:</strong> Coverage invalidated by unauthorised changes</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
                  <h3 className="font-medium text-orange-400 mb-3">Commercial and Legal Risks</h3>
                  <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                    <li><strong>Cost Disputes:</strong> Disagreements over variation pricing</li>
                    <li><strong>Legal Claims:</strong> Breach of contract allegations</li>
                    <li><strong>Payment Delays:</strong> Disputes holding up progress payments</li>
                    <li><strong>Reputation Damage:</strong> Poor relationships affecting future work</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-card/50 border border-white/10">
                <h3 className="font-medium text-white mb-3">Project Impact Assessment</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <p className="font-medium text-white mb-2">Time Impact:</p>
                    <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                      <li>Project delays up to 30%</li>
                      <li>Extended site overheads</li>
                      <li>Cascade effects on other projects</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-2">Cost Impact:</p>
                    <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                      <li>Rework costs 5-20% of value</li>
                      <li>Acceleration costs</li>
                      <li>Disruption claims</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-2">Quality Impact:</p>
                    <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
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
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Managing Variations
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Effective variation management requires structured processes and clear accountability:
              </p>

              <div className="p-4 rounded-lg bg-card/50 border border-white/10">
                <p className="font-medium text-amber-400 mb-3">Formal Recording and Approval Process</p>

                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-white mb-2">Documentation Requirements:</p>
                    <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                      <li>Record all changes formally using variation orders or site instructions</li>
                      <li>Include detailed descriptions of work affected</li>
                      <li>Specify time and cost implications</li>
                      <li>Attach supporting drawings and specifications</li>
                      <li>Obtain required signatures and approvals</li>
                      <li>Distribute to all affected parties</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-medium text-white mb-2">Approval Hierarchy:</p>
                    <ol className="text-sm text-white/70 list-decimal pl-5 space-y-1">
                      <li><strong>Site Level:</strong> Supervisor approval for minor variations (under £500)</li>
                      <li><strong>Project Level:</strong> Project manager approval for moderate variations (£500-£5000)</li>
                      <li><strong>Commercial Level:</strong> Commercial manager approval for major variations (over £5000)</li>
                      <li><strong>Client Level:</strong> Client approval required for significant scope changes</li>
                    </ol>
                  </div>

                  <div className="p-3 rounded-lg bg-orange-500/10 border-l-2 border-orange-500/50">
                    <p className="font-medium text-orange-400 mb-1">Digital Management Systems</p>
                    <p className="text-sm text-white/80">
                      Modern project management software can automate variation tracking, approval workflows, and document distribution, reducing errors and improving efficiency.
                    </p>
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

          {/* Communication Strategies */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Communication and Stakeholder Management
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Effective communication is critical for successful variation management:
              </p>

              <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                <h3 className="font-medium text-cyan-400 mb-3">Communication Framework</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-cyan-400 mb-2">Internal Communication:</p>
                    <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                      <li>Inform all affected parties early and completely</li>
                      <li>Use standardised communication templates</li>
                      <li>Establish clear escalation procedures</li>
                      <li>Regular progress updates on variation implementation</li>
                      <li>Document all verbal communications in writing</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-cyan-400 mb-2">External Communication:</p>
                    <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                      <li>Keep the client updated on time and cost implications</li>
                      <li>Coordinate with other contractors and consultants</li>
                      <li>Maintain records of all client instructions</li>
                      <li>Provide regular variation status reports</li>
                      <li>Ensure transparency in pricing and scheduling</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/30">
                <h3 className="font-medium text-indigo-400 mb-3">Dispute Prevention and Resolution</h3>
                <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                  <li><strong>Clear Documentation:</strong> Document discussions in writing to avoid disputes</li>
                  <li><strong>Prompt Notification:</strong> Notify potential variations as soon as identified</li>
                  <li><strong>Cost Transparency:</strong> Provide detailed cost breakdowns for variations</li>
                  <li><strong>Alternative Solutions:</strong> Suggest safe, cost-effective alternatives where possible</li>
                  <li><strong>Mediation Readiness:</strong> Be prepared to use formal dispute resolution procedures</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Advanced Practical Guidance
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-card/50 border border-white/10">
                  <h3 className="font-medium text-white mb-3">Daily Management Practices</h3>
                  <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                    <li>Always carry a variation log and update it daily</li>
                    <li>Never make design changes without written approval</li>
                    <li>Keep flexible with sequencing — switch tasks while waiting on issue resolution</li>
                    <li>Proactively flag potential problems (e.g., long lead-time items)</li>
                    <li>Photograph and document site conditions before and after changes</li>
                    <li>Maintain clear communication logs with timestamps</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-card/50 border border-white/10">
                  <h3 className="font-medium text-white mb-3">Quality Assurance Measures</h3>
                  <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                    <li>Verify compliance with BS 7671 for all variations</li>
                    <li>Update test schedules to reflect design changes</li>
                    <li>Ensure certification covers all varied work</li>
                    <li>Maintain as-built drawing accuracy throughout changes</li>
                    <li>Conduct additional inspections for significant variations</li>
                    <li>Document any deviations from standard procedures</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h3 className="font-medium text-elec-yellow mb-3">Technology and Digital Tools</h3>
                <div className="space-y-3 text-sm text-white/80">
                  <div>
                    <p className="font-medium text-elec-yellow">Mobile Documentation:</p>
                    <p>Use smartphones and tablets for real-time variation recording, photo documentation, and instant communication with project teams.</p>
                  </div>
                  <div>
                    <p className="font-medium text-elec-yellow">Cloud-Based Systems:</p>
                    <p>Implement cloud-based project management systems for real-time variation tracking, approval workflows, and document sharing.</p>
                  </div>
                  <div>
                    <p className="font-medium text-elec-yellow">BIM Integration:</p>
                    <p>Use Building Information Modeling (BIM) to visualise variation impacts and coordinate changes with other building systems.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Case Studies */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">10</span>
              Real-World Case Studies
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <h3 className="font-medium text-red-400 mb-2">Case Study 1: Unauthorised Structural Modification</h3>
                <p className="text-sm text-white/80 mb-3">
                  On a commercial project, electricians discovered steel beams obstructing the planned cable route. Instead of stopping and reporting, they improvised by drilling through the beam, creating a serious safety risk. The work had to be removed and redone, and the contractor faced penalties.
                </p>
                <div className="p-3 rounded bg-red-500/20">
                  <p className="font-medium text-red-400 mb-1">Lessons Learned:</p>
                  <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                    <li>Never make structural modifications without engineering approval</li>
                    <li>Stop work immediately when unexpected conditions are encountered</li>
                    <li>Cost of proper procedures far less than cost of remedial work</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <h3 className="font-medium text-green-400 mb-2">Case Study 2: Proactive Material Shortage Management</h3>
                <p className="text-sm text-white/80 mb-3">
                  During a hospital project, the electrical contractor identified potential delays in specialist fire-rated cable delivery. They immediately raised a variation to use alternative approved products, maintaining the project schedule while ensuring full compliance.
                </p>
                <div className="p-3 rounded bg-green-500/20">
                  <p className="font-medium text-green-400 mb-1">Success Factors:</p>
                  <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                    <li>Early identification of potential supply chain issues</li>
                    <li>Proactive communication with design team and client</li>
                    <li>Formal variation process prevented compliance issues</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <h3 className="font-medium text-blue-400 mb-2">Case Study 3: Client-Driven Variation Management</h3>
                <p className="text-sm text-white/80 mb-3">
                  A retail fit-out project experienced multiple client-requested changes to lighting layouts. The electrical contractor implemented a systematic variation management process, with regular client meetings and clear cost implications for each change. The project completed successfully with full client satisfaction.
                </p>
                <div className="p-3 rounded bg-blue-500/20">
                  <p className="font-medium text-blue-400 mb-1">Key Strategies:</p>
                  <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
                    <li>Structured variation approval process with clear pricing</li>
                    <li>Regular client communication to manage expectations</li>
                    <li>Detailed documentation of all changes and approvals</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">11</span>
              FAQs
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="p-4 rounded-lg bg-card/50 border-l-2 border-elec-yellow/50">
                  <p className="font-medium text-white mb-2">Q: {faq.question}</p>
                  <p className="text-sm text-white/80">A: {faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">12</span>
              Pocket Guide
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
              <div className="space-y-2 text-white">
                <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-elec-yellow" /> Record all changes in writing.</p>
                <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-elec-yellow" /> Never proceed with design changes without approval.</p>
                <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-elec-yellow" /> Report unforeseen issues immediately.</p>
                <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-elec-yellow" /> Suggest safe, practical solutions.</p>
                <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-elec-yellow" /> Stay flexible with sequencing.</p>
              </div>
            </div>
          </section>

          {/* Summary */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">13</span>
              Summary
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-white/90">
                In this subsection, you learned how to deal with variations and unforeseen issues by recording them properly, getting approval, and maintaining clear communication. You saw how ignoring or mishandling changes can lead to disputes, delays, and safety risks. A professional approach ensures problems are solved efficiently while keeping projects safe, compliant, and on track.
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
              <Link to="../3-4" className="flex items-center justify-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous: Minimising Disruption</span>
                <span className="sm:hidden">Previous</span>
              </Link>
            </Button>

            <Button
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../3-6" className="flex items-center justify-center gap-2">
                <span className="hidden sm:inline">Next: Health and Safety Planning</span>
                <span className="sm:hidden">Next</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module5Section3_5;
