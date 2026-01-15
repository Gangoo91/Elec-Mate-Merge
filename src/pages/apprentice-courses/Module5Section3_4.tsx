import { ArrowLeft, ArrowRight, UserCheck, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Minimising Disruption to Other Site Activities - Module 5.3.4 | Level 2 Electrical Course";
const DESCRIPTION = "Learn to coordinate electrical work with other trades, prevent clashes, and maintain smooth site operations through effective planning and communication.";

const quickCheckQuestions = [
  {
    id: 1,
    question: "Why is minimising disruption to other trades important?",
    options: ["To finish work faster", "To keep projects on schedule and reduce conflict", "To use fewer materials", "To work alone"],
    correctIndex: 1,
    explanation: "Minimising disruption keeps projects on schedule, prevents rework, reduces safety risks, and builds positive working relationships."
  },
  {
    id: 2,
    question: "Give one example of a common clash between electrical and another trade.",
    options: ["Working in different areas", "Electricians running cables while plastering is ongoing", "Using different tools", "Working different hours"],
    correctIndex: 1,
    explanation: "Common clashes include electricians running cables while plastering is ongoing, which can damage both trades' work."
  },
  {
    id: 3,
    question: "How can electricians protect socket boxes during plastering?",
    options: ["Remove them", "Use temporary covers", "Paint them", "Move them"],
    correctIndex: 1,
    explanation: "Temporary covers protect socket boxes from being filled with plaster or other materials during wet trades."
  }
];

const Module5Section3_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "Why is minimising disruption to other trades important?",
      options: ["To finish work faster", "To keep projects on schedule and reduce conflict", "To use fewer materials", "To work independently"],
      correctAnswer: 1,
      explanation: "Minimising disruption keeps projects on schedule, prevents rework, reduces safety risks, and maintains good professional relationships."
    },
    {
      id: 2,
      question: "Name one trade that often clashes with electricians during first fix.",
      options: ["Landscapers", "Plasterers", "Roofers", "Security guards"],
      correctAnswer: 1,
      explanation: "Plasterers often work in the same areas as electricians during first fix, creating potential for clashes and damage."
    },
    {
      id: 3,
      question: "What site document shows when each trade is scheduled to work?",
      options: ["Health and safety file", "The site programme", "Material delivery notes", "Tool inventory"],
      correctAnswer: 1,
      explanation: "The site programme shows the scheduled timing for all trades and activities on the construction project."
    },
    {
      id: 4,
      question: "True or False: Electrical accessories should be installed after plastering is complete.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "True. Electrical accessories are typically installed during second fix after plastering and other wet trades are complete."
    },
    {
      id: 5,
      question: "What can be used to protect socket boxes during plastering?",
      options: ["Plastic bags", "Temporary covers", "Newspaper", "Nothing needed"],
      correctAnswer: 1,
      explanation: "Temporary covers specifically designed for electrical boxes protect them from plaster and other materials."
    },
    {
      id: 6,
      question: "Who leads coordination between trades on site?",
      options: ["The electrician", "The site manager", "The client", "The delivery driver"],
      correctAnswer: 1,
      explanation: "The site manager oversees coordination between trades, though each trade must take responsibility for communication."
    },
    {
      id: 7,
      question: "What is a consequence of poor coordination?",
      options: ["Better quality work", "Rework, delays, or damaged installations", "Lower costs", "Faster completion"],
      correctAnswer: 1,
      explanation: "Poor coordination leads to rework, delays, damaged installations, and conflicts between trades."
    },
    {
      id: 8,
      question: "Why should electricians attend site meetings?",
      options: ["To get paid", "To plan work alongside other trades", "To take breaks", "To avoid work"],
      correctAnswer: 1,
      explanation: "Site meetings enable electricians to coordinate their work with other trades and avoid clashes."
    },
    {
      id: 9,
      question: "What should you do if another trade damages your installation?",
      options: ["Ignore it", "Report it to the supervisor immediately", "Fix it yourself quietly", "Blame the other trade"],
      correctAnswer: 1,
      explanation: "Damage should be reported immediately to the supervisor so proper procedures can be followed for repairs."
    },
    {
      id: 10,
      question: "Give one way to reduce disruption during multi-trade work in confined spaces.",
      options: ["Work faster", "Agree work times/areas with other trades", "Use more workers", "Work overtime"],
      correctAnswer: 1,
      explanation: "Coordinating work times and areas with other trades prevents conflicts and safety issues in confined spaces."
    }
  ];

  const faqs = [
    {
      question: "What if another trade damages my installation?",
      answer: "Report it immediately to your supervisor. Rework may be chargeable to that trade if poor coordination caused it. Document the damage with photos and ensure proper procedures are followed."
    },
    {
      question: "Who is responsible for site coordination?",
      answer: "The site manager oversees coordination, but each trade must take responsibility for communicating their requirements and attending coordination meetings."
    },
    {
      question: "Can electrical work be delayed to suit other trades?",
      answer: "Yes — sequencing often requires flexibility to keep overall progress smooth. Sometimes it's better to delay than to create conflicts or safety issues."
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
              <span className="text-white/60">Section 5.3.4</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Minimising Disruption to Other Site Activities
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Learn to coordinate electrical work with other trades, prevent clashes, and maintain smooth site operations through effective planning.
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
                <li>Review site programme to understand other trades' schedules.</li>
                <li>Sequence work to avoid clashes (first fix, second fix phases).</li>
                <li>Protect installations from damage during wet trades.</li>
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
                Construction projects involve multiple trades working alongside each other. Electrical installation must be carefully planned to avoid disrupting others, such as plasterers, carpenters, plumbers, or decorators. Poor coordination can cause delays, damage to work, and safety hazards. Minimising disruption ensures smoother progress for all trades and helps maintain good professional relationships.
              </p>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <div className="flex items-start gap-3">
                  <UserCheck className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-elec-yellow mb-2">Why This Matters</p>
                    <p className="text-white/70 text-sm">
                      Poor trade coordination is responsible for up to 30% of construction delays and 20% of cost overruns, making effective collaboration essential for project success.
                    </p>
                  </div>
                </div>
              </div>
              <p>
                <strong className="text-white">Real Impact:</strong> Well-coordinated projects show 40% fewer defects, 25% faster completion times, and significantly improved relationships between trades.
              </p>
              <p className="text-sm p-3 rounded bg-white/5 border border-white/10">
                <strong className="text-white">Industry Standard:</strong> CDM 2015 regulations require effective coordination between trades to ensure health, safety, and quality throughout construction projects.
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
                <li>Explain why minimising disruption to other trades is essential.</li>
                <li>Identify common clashes between electrical and other site activities.</li>
                <li>Apply planning methods to reduce disruption.</li>
                <li>Communicate effectively with other trades on site.</li>
                <li>Recognise the consequences of poor coordination.</li>
              </ul>
            </div>
          </section>

          {/* Why Minimising Disruption Matters */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Why Minimising Disruption Matters
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Effective coordination between trades is fundamental to successful construction projects:</p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-elec-yellow mb-3">Project Management Benefits</p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-white font-medium mb-1">Schedule Management:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Keeps projects on schedule by preventing trade conflicts</li>
                      <li>Reduces time lost to coordination delays</li>
                      <li>Enables efficient resource utilisation across trades</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Quality Assurance:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Prevents rework and damage to finished work</li>
                      <li>Maintains installation integrity throughout construction</li>
                      <li>Ensures compliance with specifications and standards</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Safety and Risk Reduction:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Reduces safety risks from overlapping tasks</li>
                      <li>Prevents hazardous working conditions</li>
                      <li>Minimises accidents from conflicting activities</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-3 rounded bg-green-500/10 border border-green-500/20">
                  <p className="font-medium text-green-400 mb-1">Economic Impact</p>
                  <p className="text-sm text-white/70">
                    Effective trade coordination can reduce project costs by 15-20% through reduced rework, faster completion, and improved efficiency.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Common Trade Clashes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Common Trade Clashes
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Understanding typical conflict points helps prevent problems before they occur:</p>

              <div className="space-y-4">
                {/* Electrical vs Plastering */}
                <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                  <p className="font-medium text-green-400 mb-3">A. Electrical vs Plastering Conflicts</p>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-white font-medium mb-1">Common Issues:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Electricians running cables while plastering is ongoing</li>
                        <li>Socket boxes filled with plaster</li>
                        <li>Cable routes blocked by wet plaster</li>
                        <li>Dust contamination of electrical equipment</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-1">Prevention Methods:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Complete first fix before plastering starts</li>
                        <li>Use protective covers on all outlets</li>
                        <li>Mark cable routes clearly</li>
                        <li>Coordinate access timing</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-3 p-3 rounded bg-green-500/10 border border-green-500/20">
                    <p className="font-medium text-green-400 mb-1">Best Practice Timing</p>
                    <p className="text-sm text-white/70">
                      Complete all electrical first fix work 24-48 hours before plasterers begin. This allows time for any adjustments.
                    </p>
                  </div>
                </div>

                {/* Electrical vs Mechanical */}
                <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                  <p className="font-medium text-elec-yellow mb-3">B. Electrical vs Mechanical Services</p>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-white font-medium mb-1">Conflict Areas:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Containment clashing with ductwork routes</li>
                        <li>Cable trays interfering with pipework</li>
                        <li>Plant room space allocation conflicts</li>
                        <li>Ceiling void congestion issues</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-1">Coordination Solutions:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Joint planning sessions for routes</li>
                        <li>3D coordination drawings</li>
                        <li>Agreed service hierarchy protocols</li>
                        <li>Shared plant room layouts</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Electrical vs Carpentry */}
                <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                  <p className="font-medium text-purple-400 mb-3">C. Electrical vs Carpentry and Decoration</p>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-white font-medium mb-1">Typical Clashes:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Socket outlets fitted before carpentry complete</li>
                        <li>Lighting installation clashing with ceiling work</li>
                        <li>Paint damage to new electrical fittings</li>
                        <li>Trim work covering cable routes</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-1">Sequencing Solutions:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Install accessories after carpentry/decoration</li>
                        <li>Coordinate lighting with ceiling installers</li>
                        <li>Protect finished work during painting</li>
                        <li>Mark outlet positions for trim work</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="clashes-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* Planning to Avoid Disruption */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Planning to Avoid Disruption
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Proactive planning prevents conflicts before they occur:</p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-amber-400 mb-3">Comprehensive Planning Framework</p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-white font-medium mb-1">Programme Analysis and Integration:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Review the site programme to understand other trades' schedules</li>
                      <li>Identify critical path activities and dependencies</li>
                      <li>Map electrical work phases to construction sequence</li>
                      <li>Build in contingency time for coordination issues</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Task Sequencing Strategy:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Carry out task sequencing to avoid clashes</li>
                      <li>Plan first fix before any wet trades begin</li>
                      <li>Schedule second fix after decoration preparation</li>
                      <li>Coordinate testing phases with project milestones</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Phased Work Implementation:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Work in phases coordinated with construction progress</li>
                      <li>Complete work by zones or floors systematically</li>
                      <li>Handover completed areas to following trades</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="disruption-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* Consequences of Poor Coordination */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Consequences of Poor Coordination
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <h3 className="font-medium text-red-400 mb-3">Direct Consequences</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm text-white/80">
                  <li><strong className="text-white">Time Delays:</strong> Project schedule disruption and overruns</li>
                  <li><strong className="text-white">Cost Increases:</strong> Rework, materials waste, extended site costs</li>
                  <li><strong className="text-white">Quality Issues:</strong> Damage to installed work requiring repair</li>
                  <li><strong className="text-white">Safety Risks:</strong> Unsafe working conditions from conflicting activities</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <h3 className="font-medium text-orange-400 mb-3">Indirect Consequences</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm text-white/80">
                  <li><strong className="text-white">Relationship Damage:</strong> Frustration and conflict between trades</li>
                  <li><strong className="text-white">Reputation Impact:</strong> Reduced future work opportunities</li>
                  <li><strong className="text-white">Team Morale:</strong> Stress and job satisfaction issues</li>
                  <li><strong className="text-white">Client Relations:</strong> Reduced confidence and satisfaction</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="protection-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          {/* Practical Guidance */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Practical Guidance
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">Protection Systems and Methods</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm text-white/80">
                  <li>Mark out containment and accessory positions clearly</li>
                  <li>Install temporary covers to protect accessories during wet trades</li>
                  <li>Use clear signage ("Do Not Cover" tags on back boxes)</li>
                  <li>Apply protective film to finished installations</li>
                  <li>Establish exclusion zones around sensitive equipment</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">Conflict Resolution Strategies</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm text-white/80">
                  <li>Avoid working in confined spaces with multiple trades unless coordinated</li>
                  <li>Be flexible — adjust jobs to allow others to complete work first</li>
                  <li>Establish clear escalation procedures for disputes</li>
                  <li>Use mediation through site management when needed</li>
                  <li>Document agreements and changes in writing</li>
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
                On a housing site, electricians installed socket boxes before plastering without protective covers. Plasterers filled in the boxes, requiring electricians to dig them out later. This wasted hours of work and created friction between trades. Proper coordination and use of protective covers would have prevented the issue.
              </p>
              <div className="p-3 rounded bg-amber-500/20 border border-amber-500/30">
                <p className="font-medium text-amber-300 mb-1">Lessons Learned:</p>
                <ul className="list-disc pl-5 text-sm text-amber-200">
                  <li>Always use appropriate protective covers for electrical boxes</li>
                  <li>Clear communication needed about protection requirements</li>
                  <li>Cost of prevention far less than cost of remedial work</li>
                  <li>Document protection requirements in method statements</li>
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
                <p>• Review site programme regularly.</p>
                <p>• Sequence work with other trades.</p>
                <p>• Use coordination meetings to plan access.</p>
                <p>• Protect electrical work from damage.</p>
                <p>• Stay flexible to avoid delays and conflict.</p>
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
                In this subsection, you learned how to minimise disruption to other site activities by understanding common trade clashes, sequencing tasks properly, and communicating effectively. You saw the risks of poor coordination and explored practical methods like protective covers, clear markings, and flexible scheduling to avoid problems.
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
              <Link to="../3-3">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../3-5">
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

export default Module5Section3_4;
