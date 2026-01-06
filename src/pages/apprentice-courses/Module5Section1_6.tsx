import { ArrowLeft, ArrowRight, Lightbulb, Target, CheckCircle, AlertTriangle, Users, BookOpen, Clipboard, Shield, HelpCircle, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

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
    <div className="min-h-screen bg-[#121212]">
      {/* Top header bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 1
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
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 5.1.6
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Dealing with Incomplete or Conflicting Information
          </h1>
          <p className="text-white">
            Learn to identify and resolve incomplete or conflicting information in electrical drawings and specifications.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Not all drawings and specifications are perfect - information may be missing or contradictory.</li>
                <li>Making assumptions can lead to unsafe installations and costly rework.</li>
                <li>Always escalate unclear information to supervisors and document all clarifications.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Missing dimensions, conflicting symbols, outdated revisions.</li>
                <li><strong>Use:</strong> Escalation procedures, formal documentation, team communication.</li>
                <li><strong>Check:</strong> Revision numbers, drawing-specification consistency, site conditions.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>Recognise signs of incomplete or conflicting information in drawings/specifications.</li>
            <li>Apply methods to verify and resolve discrepancies.</li>
            <li>Understand who to escalate issues to on-site.</li>
            <li>Avoid the risks of making assumptions without confirmation.</li>
            <li>Work to ensure installations remain safe and compliant despite unclear documentation.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content / Learning</h2>

          {/* Common Issues */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">1. Common Issues with Documentation</h3>
            <p className="text-base text-white mb-4">
              Documentation problems occur frequently on electrical projects:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-elec-yellow mb-1">Typical Documentation Problems</p>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Missing information:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                          <li>Missing dimensions or notes</li>
                          <li>Incomplete circuit details</li>
                          <li>Absent cable specifications</li>
                          <li>Missing equipment ratings</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-base text-white mb-2"><strong>Conflicting information:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                          <li>Socket marked as single in one place, double in another</li>
                          <li>Different cable types specified in drawing vs schedule</li>
                          <li>Contradictory installation methods</li>
                          <li>Inconsistent equipment specifications</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-base text-white mb-2"><strong>Version control issues:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                          <li>Outdated revisions being used</li>
                          <li>Superseded drawings still in circulation</li>
                          <li>Missing revision notifications</li>
                          <li>Unclear drawing status</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-base text-white mb-2"><strong>Site condition mismatches:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                          <li>Drawings not matching actual site conditions</li>
                          <li>Structural changes not reflected</li>
                          <li>Access issues not considered</li>
                          <li>Existing services conflicts</li>
                        </ul>
                      </div>
                    </div>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Key principle:</strong> Documentation problems are common - always verify before proceeding
                    </div>
                  </div>
                </div>
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
          <Separator className="my-6" />

          {/* Risks */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">2. Risks of Proceeding Without Clarification</h3>
            <p className="text-base text-white mb-4">
              The consequences of assuming or guessing can be severe:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-elec-yellow mb-1">Serious Consequences</p>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Safety risks:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                          <li>Unsafe installations</li>
                          <li>Non-compliant work</li>
                          <li>Risk to life and property</li>
                          <li>Professional liability issues</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-base text-white mb-2"><strong>Commercial impacts:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                          <li>Failed inspections</li>
                          <li>Costly rework and delays</li>
                          <li>Material waste</li>
                          <li>Additional labour costs</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-base text-white mb-2"><strong>Professional consequences:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                          <li>Breach of contract obligations</li>
                          <li>Damage to reputation</li>
                          <li>Potential legal action</li>
                          <li>Loss of future work</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-base text-white mb-2"><strong>Project impacts:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                          <li>Programme delays</li>
                          <li>Budget overruns</li>
                          <li>Client dissatisfaction</li>
                          <li>Team morale issues</li>
                        </ul>
                      </div>
                    </div>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Remember:</strong> The cost of stopping to ask is always less than the cost of getting it wrong
                    </div>
                  </div>
                </div>
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
          <Separator className="my-6" />

          {/* Resolution Methods */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">3. Methods of Resolution</h3>
            <p className="text-base text-white mb-4">
              Systematic approaches to identifying and resolving documentation issues:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-1">Verification Process</p>
                    <div className="space-y-3">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Document verification:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                          <li>Always check the revision number of drawings</li>
                          <li>Verify drawing issue dates</li>
                          <li>Cross-reference with drawing register</li>
                          <li>Confirm latest versions are being used</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-base text-white mb-2"><strong>Consistency checks:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                          <li>Compare drawings against specifications for consistency</li>
                          <li>Check different drawing sheets for conflicts</li>
                          <li>Verify equipment schedules match drawings</li>
                          <li>Ensure cable schedules align with installations</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-base text-white mb-2"><strong>Pre-work identification:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                          <li>Highlight discrepancies before starting work</li>
                          <li>Mark unclear areas on drawings</li>
                          <li>List all questions and uncertainties</li>
                          <li>Prepare detailed queries for resolution</li>
                        </ul>
                      </div>
                    </div>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Best practice:</strong> Spend time at the start checking rather than fixing mistakes later
                    </div>
                  </div>
                </div>
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
        </Card>

        {/* Real-World Example */}
        <Card className="mb-8 border-slate-300 bg-slate-100 dark:bg-card/50 dark:border-slate-600">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Users className="w-5 h-5" />
              Real-World Example
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-slate-700 dark:text-slate-300">
              <p className="font-medium">Hospital Project Emergency Lighting Conflict</p>
              <p>
                On a hospital project, lighting drawings showed emergency lights in one corridor, but the specification 
                required double the number. The issue wasn't raised, and the work failed compliance checks, requiring 
                reinstallation.
              </p>
              <p className="font-medium">The consequences:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Two days of additional work to install extra fittings</li>
                <li>£3,000 in additional materials and labour costs</li>
                <li>Delayed hospital opening by one week</li>
                <li>Client dissatisfaction and potential future work loss</li>
              </ul>
              <p className="font-medium text-green-600 dark:text-green-400">
                Proper escalation would have identified the conflict before installation, saving time and money while 
                ensuring patient safety compliance.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Escalation Process */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">4. Escalation Process</h2>
          
          <div className="space-y-4">
            <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
              <div className="flex items-start gap-3 mb-2">
                <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                <div className="flex-1">
                  <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Structured Escalation Path</p>
                  <div className="space-y-3">
                    <div>
                      <p className="text-base text-white mb-2"><strong>Step 1 - Site supervisor:</strong></p>
                      <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                        <li>Raise questions with the site supervisor first</li>
                        <li>Explain the specific discrepancy clearly</li>
                        <li>Provide all relevant documentation</li>
                        <li>Request written clarification</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-base text-white mb-2"><strong>Step 2 - Project manager:</strong></p>
                      <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                        <li>If unresolved, escalate to the project manager</li>
                        <li>Document previous escalation attempts</li>
                        <li>Highlight project impact potential</li>
                        <li>Request urgent resolution</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-base text-white mb-2"><strong>Step 3 - Designer/client:</strong></p>
                      <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                        <li>Final escalation to designer or client</li>
                        <li>Formal documentation required</li>
                        <li>Clear statement of work stoppage if needed</li>
                        <li>Request for formal instruction or clarification</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-base text-white mb-2"><strong>Documentation requirements:</strong></p>
                      <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                        <li>Record all clarifications formally (emails, site instructions)</li>
                        <li>Keep copies of all correspondence</li>
                        <li>Note dates, times, and people involved</li>
                        <li>Share clarifications with the whole team</li>
                      </ul>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                    <strong>Key rule:</strong> Always get clarifications in writing - verbal instructions can be forgotten or misunderstood
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Best Practice */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">5. Best Practice</h2>
          
          <div className="space-y-4">
            <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
              <div className="flex items-start gap-3 mb-2">
                <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                <div className="flex-1">
                  <p className="font-semibold text-purple-600 dark:text-elec-yellow mb-1">Professional Standards</p>
                  <div className="space-y-3">
                    <div>
                      <p className="text-base text-white mb-2"><strong>Golden rules:</strong></p>
                      <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                        <li>Never guess — stop and ask</li>
                        <li>Document everything in writing</li>
                        <li>Share information with the whole team</li>
                        <li>Don't assume - always verify</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-base text-white mb-2"><strong>Record keeping:</strong></p>
                      <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                        <li>Keep records of all discrepancies and how they were resolved</li>
                        <li>Maintain a project query log</li>
                        <li>File all email clarifications</li>
                        <li>Update drawing sets with written instructions</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-base text-white mb-2"><strong>Team communication:</strong></p>
                      <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                        <li>Share clarifications with the whole team to ensure consistency</li>
                        <li>Update all affected personnel immediately</li>
                        <li>Include clarifications in team briefings</li>
                        <li>Ensure supervisors communicate changes clearly</li>
                      </ul>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                    <strong>Professional approach:</strong> Thorough documentation and communication prevent repeated mistakes
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="group border border-white/10 rounded-lg">
                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                  <span className="font-medium text-white">{faq.question}</span>
                  <HelpCircle className="w-5 h-5 text-white group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-4 pb-4 text-white border-t border-white/10 pt-4">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-8 border-slate-300 bg-slate-100 dark:bg-card/50 dark:border-slate-600">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Book className="w-5 h-5" />
              Pocket Guide: Dealing with Conflicting Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-slate-700 dark:text-slate-300">
              <div className="space-y-2">
                <p>✅ Check revision numbers</p>
                <p>✅ Compare drawings with specifications</p>
                <p>✅ Escalate issues immediately</p>
                <p>✅ Record clarifications in writing</p>
                <p>✅ Never assume — always confirm</p>
              </div>
              <div className="space-y-2">
                <p><strong>Escalation order:</strong></p>
                <p>1. Site supervisor</p>
                <p>2. Project manager</p>
                <p>3. Designer/client</p>
                <p><strong>Remember:</strong> Stop work if unclear!</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Recap</h2>
          <p className="text-base text-white mb-4">In this subsection, you learned:</p>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <ul className="list-disc pl-6 space-y-2 text-base text-white">
                <li>How to spot incomplete or conflicting information</li>
                <li>Why it's risky to proceed without clarification</li>
                <li>The correct escalation process for resolving issues</li>
                <li>Best practice for ensuring safe and compliant work despite unclear documents</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent">
              <p className="font-medium text-white mb-2">Key takeaway:</p>
              <p className="text-base text-white">
                By following these steps, you prevent mistakes and keep installations safe, compliant, and efficient. 
                The time spent clarifying unclear information is always an investment in quality and safety.
              </p>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <div className="mb-8">
          <Quiz questions={quizQuestions} />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-white/10">
          <Button variant="outline" asChild>
            <Link to="../1-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Subsection 5
            </Link>
          </Button>
          <Button asChild>
            <Link to="..">
              Section Complete
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module5Section1_6;