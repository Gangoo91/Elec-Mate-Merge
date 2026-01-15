import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";
import { useState } from "react";

const TITLE = "Dealing with Incomplete or Conflicting Information - Module 5.1.6 | Level 2 Electrical Course";
const DESCRIPTION = "Learn to identify and resolve incomplete or conflicting information in electrical drawings and specifications. Master escalation procedures and best practices for safe installations.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What should always be checked to ensure a drawing is up to date?",
    options: ["The scale", "The revision number", "The date", "The title"],
    correctIndex: 1,
    explanation: "The revision number must always be checked to ensure you're working with the most current version of the drawing."
  },
  {
    id: 2,
    question: "Who should you escalate conflicting information to first?",
    options: ["The client", "The site supervisor", "The designer", "Another apprentice"],
    correctIndex: 1,
    explanation: "The site supervisor should be your first point of contact when dealing with conflicting or unclear information."
  },
  {
    id: 3,
    question: "What is the main risk of making assumptions about unclear drawings?",
    options: ["Delays", "Unsafe installations", "Material waste", "All of the above"],
    correctIndex: 3,
    explanation: "Making assumptions can lead to all these issues: unsafe installations, delays, and material waste, plus failed inspections."
  }
];

const Module5Section1_6 = () => {
  useSEO(TITLE, DESCRIPTION);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const quizQuestions = [
    {
      id: 1,
      question: "What is a common sign of conflicting information in drawings?",
      options: [
        "A socket shown as single in one place but double in another",
        "Missing title block",
        "Wrong paper size",
        "Poor print quality"
      ],
      correctAnswer: 0,
      explanation: "When the same component is shown differently in various parts of the drawing, this indicates conflicting information."
    },
    {
      id: 2,
      question: "True or False: It is acceptable to continue work with missing dimensions if you use your best judgement.",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 1,
      explanation: "False. Never use your best judgement when dimensions are missing - always seek clarification to avoid costly mistakes."
    },
    {
      id: 3,
      question: "What should you always check to ensure drawings are current?",
      options: [
        "The title",
        "The revision number",
        "The scale",
        "The drawing number"
      ],
      correctAnswer: 1,
      explanation: "The revision number indicates which version of the drawing you have and ensures you're working with the most current information."
    },
    {
      id: 4,
      question: "If drawings and specifications disagree, what should you do?",
      options: [
        "Follow the drawing",
        "Follow the specification",
        "Escalate the issue to the supervisor or project manager",
        "Ask another apprentice"
      ],
      correctAnswer: 2,
      explanation: "Always escalate conflicts between drawings and specifications to ensure the correct approach is taken."
    },
    {
      id: 5,
      question: "Who should be contacted first when information is unclear?",
      options: [
        "The client",
        "Site supervisor",
        "The designer",
        "Health and safety officer"
      ],
      correctAnswer: 1,
      explanation: "The site supervisor is your first point of contact for resolving unclear information on-site."
    },
    {
      id: 6,
      question: "Why should clarifications always be documented?",
      options: [
        "It's not necessary",
        "To protect yourself and ensure consistent team understanding",
        "To waste time",
        "Only for legal reasons"
      ],
      correctAnswer: 1,
      explanation: "Documentation protects you and ensures all team members have consistent understanding of any changes or clarifications."
    },
    {
      id: 7,
      question: "What is one risk of ignoring incomplete documentation?",
      options: [
        "Nothing happens",
        "Failed inspection",
        "Improved efficiency",
        "Cost savings"
      ],
      correctAnswer: 1,
      explanation: "Ignoring incomplete documentation can lead to failed inspections, requiring costly rework and delays."
    },
    {
      id: 8,
      question: "True or False: Specifications always override drawings without confirmation.",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 1,
      explanation: "False. Clarification is always required when specifications and drawings conflict - never assume priority."
    },
    {
      id: 9,
      question: "Give one best practice when dealing with unclear drawings.",
      options: [
        "Guess based on experience",
        "Stop and ask - never guess",
        "Continue and fix later",
        "Ignore the problem"
      ],
      correctAnswer: 1,
      explanation: "The golden rule is to stop and ask for clarification rather than guessing, which prevents costly mistakes."
    },
    {
      id: 10,
      question: "What happened in the real-world hospital project example?",
      options: [
        "The project finished early",
        "Everything went smoothly",
        "Emergency lighting requirements were missed because the drawing and specification conflicted, leading to reinstallation",
        "The client was happy"
      ],
      correctAnswer: 2,
      explanation: "The hospital project failed compliance checks due to conflicting emergency lighting requirements, requiring expensive reinstallation."
    }
  ];

  const faqs = [
    {
      question: "Can I make small assumptions if the drawing isn't clear?",
      answer: "No — always clarify to avoid risks and rework. Even small assumptions can lead to major problems and costly corrections."
    },
    {
      question: "What if drawings and specifications contradict each other?",
      answer: "Raise the conflict with your supervisor and confirm in writing which takes priority. Never assume one document overrides another."
    },
    {
      question: "Why is documenting clarifications important?",
      answer: "To protect yourself and ensure consistent work across the team. Written records prevent misunderstandings and provide clear reference for future work."
    },
    {
      question: "What should I do if my supervisor is unavailable when I find conflicting information?",
      answer: "Stop work on that area and escalate to the project manager or designer. Never proceed with uncertain information, even under time pressure."
    },
    {
      question: "How do I know if a drawing revision is the latest version?",
      answer: "Check the revision number in the title block and compare with the issued drawing register. When in doubt, ask the site supervisor to confirm."
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
              Back to Section 5.1
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
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 5</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 5.1.6</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Dealing with Incomplete or Conflicting Information
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Learn to identify and resolve incomplete or conflicting information in electrical drawings and specifications.
            </p>
          </header>

          {/* Summary Box */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
                <ul className="list-disc pl-5 space-y-1 text-white/80 text-sm">
                  <li>Not all drawings and specifications are perfect - information may be missing or contradictory.</li>
                  <li>Making assumptions can lead to unsafe installations and costly rework.</li>
                  <li>Always escalate unclear information to supervisors and document all clarifications.</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
                <ul className="list-disc pl-5 space-y-1 text-white/80 text-sm">
                  <li><strong>Spot:</strong> Missing dimensions, conflicting symbols, outdated revisions.</li>
                  <li><strong>Use:</strong> Escalation procedures, formal documentation, team communication.</li>
                  <li><strong>Check:</strong> Revision numbers, drawing-specification consistency, site conditions.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">00</span>
              Learning Outcomes
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Recognise signs of incomplete or conflicting information in drawings/specifications.</li>
              <li>Apply methods to verify and resolve discrepancies.</li>
              <li>Understand who to escalate issues to on-site.</li>
              <li>Avoid the risks of making assumptions without confirmation.</li>
              <li>Work to ensure installations remain safe and compliant despite unclear documentation.</li>
            </ul>
          </section>

          {/* Common Issues */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Common Issues with Documentation
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Documentation problems occur frequently on electrical projects:
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-red-500/50">
                <p className="font-medium text-white mb-3">Typical Documentation Problems</p>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="mb-2"><strong className="text-white">Missing information:</strong></p>
                    <ul className="text-sm ml-4 mb-2 list-disc space-y-1">
                      <li>Missing dimensions or notes</li>
                      <li>Incomplete circuit details</li>
                      <li>Absent cable specifications</li>
                      <li>Missing equipment ratings</li>
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2"><strong className="text-white">Conflicting information:</strong></p>
                    <ul className="text-sm ml-4 mb-2 list-disc space-y-1">
                      <li>Socket marked as single in one place, double in another</li>
                      <li>Different cable types specified in drawing vs schedule</li>
                      <li>Contradictory installation methods</li>
                      <li>Inconsistent equipment specifications</li>
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2"><strong className="text-white">Version control issues:</strong></p>
                    <ul className="text-sm ml-4 mb-2 list-disc space-y-1">
                      <li>Outdated revisions being used</li>
                      <li>Superseded drawings still in circulation</li>
                      <li>Missing revision notifications</li>
                      <li>Unclear drawing status</li>
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2"><strong className="text-white">Site condition mismatches:</strong></p>
                    <ul className="text-sm ml-4 mb-2 list-disc space-y-1">
                      <li>Drawings not matching actual site conditions</li>
                      <li>Structural changes not reflected</li>
                      <li>Access issues not considered</li>
                      <li>Existing services conflicts</li>
                    </ul>
                  </div>
                </div>

                <p className="text-sm text-white/60 mt-3">
                  <strong>Key principle:</strong> Documentation problems are common - always verify before proceeding
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="documentation-issues-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          <div className="border-t border-white/10 my-8" />

          {/* Risks */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Risks of Proceeding Without Clarification
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                The consequences of assuming or guessing can be severe:
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-orange-500/50">
                <p className="font-medium text-white mb-3">Serious Consequences</p>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="mb-2"><strong className="text-white">Safety risks:</strong></p>
                    <ul className="text-sm ml-4 mb-2 list-disc space-y-1">
                      <li>Unsafe installations</li>
                      <li>Non-compliant work</li>
                      <li>Risk to life and property</li>
                      <li>Professional liability issues</li>
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2"><strong className="text-white">Commercial impacts:</strong></p>
                    <ul className="text-sm ml-4 mb-2 list-disc space-y-1">
                      <li>Failed inspections</li>
                      <li>Costly rework and delays</li>
                      <li>Material waste</li>
                      <li>Additional labour costs</li>
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2"><strong className="text-white">Professional consequences:</strong></p>
                    <ul className="text-sm ml-4 mb-2 list-disc space-y-1">
                      <li>Breach of contract obligations</li>
                      <li>Damage to reputation</li>
                      <li>Potential legal action</li>
                      <li>Loss of future work</li>
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2"><strong className="text-white">Project impacts:</strong></p>
                    <ul className="text-sm ml-4 mb-2 list-disc space-y-1">
                      <li>Programme delays</li>
                      <li>Budget overruns</li>
                      <li>Client dissatisfaction</li>
                      <li>Team morale issues</li>
                    </ul>
                  </div>
                </div>

                <p className="text-sm text-white/60 mt-3">
                  <strong>Remember:</strong> The cost of stopping to ask is always less than the cost of getting it wrong
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="risks-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          <div className="border-t border-white/10 my-8" />

          {/* Resolution Methods */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Methods of Resolution
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Systematic approaches to identifying and resolving documentation issues:
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-3">Verification Process</p>
                <div className="space-y-3">
                  <div>
                    <p className="mb-2"><strong className="text-white">Document verification:</strong></p>
                    <ul className="text-sm ml-4 mb-2 list-disc space-y-1">
                      <li>Always check the revision number of drawings</li>
                      <li>Verify drawing issue dates</li>
                      <li>Cross-reference with drawing register</li>
                      <li>Confirm latest versions are being used</li>
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2"><strong className="text-white">Consistency checks:</strong></p>
                    <ul className="text-sm ml-4 mb-2 list-disc space-y-1">
                      <li>Compare drawings against specifications for consistency</li>
                      <li>Check different drawing sheets for conflicts</li>
                      <li>Verify equipment schedules match drawings</li>
                      <li>Ensure cable schedules align with installations</li>
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2"><strong className="text-white">Pre-work identification:</strong></p>
                    <ul className="text-sm ml-4 mb-2 list-disc space-y-1">
                      <li>Highlight discrepancies before starting work</li>
                      <li>Mark unclear areas on drawings</li>
                      <li>List all questions and uncertainties</li>
                      <li>Prepare detailed queries for resolution</li>
                    </ul>
                  </div>
                </div>

                <p className="text-sm text-white/60 mt-3">
                  <strong>Best practice:</strong> Spend time at the start checking rather than fixing mistakes later
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="resolution-methods-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          <div className="border-t border-white/10 my-8" />

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Real-World Example
            </h2>
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="text-white/80">
                  <p className="font-medium text-white mb-2">Hospital Project Emergency Lighting Conflict</p>
                  <p className="text-sm mb-3">
                    On a hospital project, lighting drawings showed emergency lights in one corridor, but the specification
                    required double the number. The issue wasn't raised, and the work failed compliance checks, requiring
                    reinstallation.
                  </p>
                  <p className="font-medium text-white mb-2 text-sm">The consequences:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm mb-3">
                    <li>Two days of additional work to install extra fittings</li>
                    <li>£3,000 in additional materials and labour costs</li>
                    <li>Delayed hospital opening by one week</li>
                    <li>Client dissatisfaction and potential future work loss</li>
                  </ul>
                  <p className="text-sm font-medium text-green-400">
                    Proper escalation would have identified the conflict before installation, saving time and money while
                    ensuring patient safety compliance.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Escalation Process */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Escalation Process
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <p className="font-medium text-white mb-3">Structured Escalation Path</p>
                <div className="space-y-3">
                  <div>
                    <p className="mb-2"><strong className="text-white">Step 1 - Site supervisor:</strong></p>
                    <ul className="text-sm ml-4 mb-2 list-disc space-y-1">
                      <li>Raise questions with the site supervisor first</li>
                      <li>Explain the specific discrepancy clearly</li>
                      <li>Provide all relevant documentation</li>
                      <li>Request written clarification</li>
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2"><strong className="text-white">Step 2 - Project manager:</strong></p>
                    <ul className="text-sm ml-4 mb-2 list-disc space-y-1">
                      <li>If unresolved, escalate to the project manager</li>
                      <li>Document previous escalation attempts</li>
                      <li>Highlight project impact potential</li>
                      <li>Request urgent resolution</li>
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2"><strong className="text-white">Step 3 - Designer/client:</strong></p>
                    <ul className="text-sm ml-4 mb-2 list-disc space-y-1">
                      <li>Final escalation to designer or client</li>
                      <li>Formal documentation required</li>
                      <li>Clear statement of work stoppage if needed</li>
                      <li>Request for formal instruction or clarification</li>
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2"><strong className="text-white">Documentation requirements:</strong></p>
                    <ul className="text-sm ml-4 mb-2 list-disc space-y-1">
                      <li>Record all clarifications formally (emails, site instructions)</li>
                      <li>Keep copies of all correspondence</li>
                      <li>Note dates, times, and people involved</li>
                      <li>Share clarifications with the whole team</li>
                    </ul>
                  </div>
                </div>

                <p className="text-sm text-white/60 mt-3">
                  <strong>Key rule:</strong> Always get clarifications in writing - verbal instructions can be forgotten or misunderstood
                </p>
              </div>
            </div>
          </section>

          <div className="border-t border-white/10 my-8" />

          {/* Best Practice */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Best Practice
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-white mb-3">Professional Standards</p>
                <div className="space-y-3">
                  <div>
                    <p className="mb-2"><strong className="text-white">Golden rules:</strong></p>
                    <ul className="text-sm ml-4 mb-2 list-disc space-y-1">
                      <li>Never guess — stop and ask</li>
                      <li>Document everything in writing</li>
                      <li>Share information with the whole team</li>
                      <li>Don't assume - always verify</li>
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2"><strong className="text-white">Record keeping:</strong></p>
                    <ul className="text-sm ml-4 mb-2 list-disc space-y-1">
                      <li>Keep records of all discrepancies and how they were resolved</li>
                      <li>Maintain a project query log</li>
                      <li>File all email clarifications</li>
                      <li>Update drawing sets with written instructions</li>
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2"><strong className="text-white">Team communication:</strong></p>
                    <ul className="text-sm ml-4 mb-2 list-disc space-y-1">
                      <li>Share clarifications with the whole team to ensure consistency</li>
                      <li>Update all affected personnel immediately</li>
                      <li>Include clarifications in team briefings</li>
                      <li>Ensure supervisors communicate changes clearly</li>
                    </ul>
                  </div>
                </div>

                <p className="text-sm text-white/60 mt-3">
                  <strong>Professional approach:</strong> Thorough documentation and communication prevent repeated mistakes
                </p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-white/10 rounded-lg overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between p-4 text-left min-h-[48px] touch-manipulation active:bg-white/5"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="font-medium text-white pr-4">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-white/60 flex-shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === index && (
                    <div className="px-4 pb-4 text-white/70 text-sm border-t border-white/10 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Pocket Guide
            </h2>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="grid md:grid-cols-2 gap-4 text-sm text-white/80">
                <div className="space-y-2">
                  <p className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Check revision numbers</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Compare drawings with specifications</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Escalate issues immediately</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Record clarifications in writing</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Never assume — always confirm</span>
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-white">Escalation order:</p>
                  <p>1. Site supervisor</p>
                  <p>2. Project manager</p>
                  <p>3. Designer/client</p>
                  <p className="font-medium text-elec-yellow mt-2">Remember: Stop work if unclear!</p>
                </div>
              </div>
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Recap
            </h2>
            <div className="text-white/80 space-y-4">
              <p>In this subsection, you learned:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>How to spot incomplete or conflicting information</li>
                <li>Why it's risky to proceed without clarification</li>
                <li>The correct escalation process for resolving issues</li>
                <li>Best practice for ensuring safe and compliant work despite unclear documents</li>
              </ul>
              <div className="mt-4 p-4 rounded-lg bg-white/5">
                <p className="font-medium text-white mb-2">Key takeaway:</p>
                <p className="text-sm">
                  By following these steps, you prevent mistakes and keep installations safe, compliant, and efficient.
                  The time spent clarifying unclear information is always an investment in quality and safety.
                </p>
              </div>
            </div>
          </section>

          {/* Quiz */}
          <div className="mb-10">
            <Quiz
              title="Conflicting Information Quiz"
              questions={quizQuestions}
            />
          </div>

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../1-5">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                Section Complete
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module5Section1_6;
