import { ArrowLeft, ArrowRight, AlertTriangle, CheckCircle, Clipboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Avoiding Installation Conflicts - Module 5.5.4 | Level 2 Electrical Course";
const DESCRIPTION = "Learn to prevent and resolve installation conflicts between trades. Essential for efficient electrical installation and avoiding costly rework on site.";

const quickCheckQuestions = [
  {
    id: 1,
    question: "What is an installation conflict?",
    options: ["A disagreement between workers", "When two trades try to install equipment in the same space", "A faulty component", "A scheduling delay"],
    correctIndex: 1,
    explanation: "Installation conflicts occur when two trades try to install equipment in the same space, such as trunking where pipework is planned."
  },
  {
    id: 2,
    question: "Name two common areas where conflicts occur.",
    options: ["Basement and roof only", "Ceiling voids and service risers", "Car park and entrance", "Kitchen and bathroom only"],
    correctIndex: 1,
    explanation: "Ceiling voids and service risers are common conflict areas where multiple trades compete for limited space."
  },
  {
    id: 3,
    question: "What should you do if you spot a clash on site?",
    options: ["Continue working and ignore it", "Move another trade's work", "Report it to your supervisor immediately", "Complete your work first"],
    correctIndex: 2,
    explanation: "You should report potential clashes immediately to your supervisor - never ignore them or move another trade's installation."
  }
];

const Module5Section5_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is an installation conflict?",
      options: ["A disagreement between workers", "When two trades try to install in the same space", "A faulty electrical component", "A delay in material delivery"],
      correctAnswer: 1,
      explanation: "Installation conflicts occur when two trades try to install equipment in the same space, causing delays, damage, and unsafe conditions."
    },
    {
      id: 2,
      question: "Name two common areas where conflicts occur.",
      options: ["Offices and meeting rooms", "Ceiling voids and service risers", "Car parks and driveways", "Canteens and rest areas"],
      correctAnswer: 1,
      explanation: "Ceiling voids and service risers are common conflict areas where ducts, trunking, lighting, sprinkler pipes and other services compete for space."
    },
    {
      id: 3,
      question: "True or False: You can move another trade's work if it blocks your run.",
      options: ["True - if it's in your way", "False", "True - but only with permission", "True - if it's not finished"],
      correctAnswer: 1,
      explanation: "False - you must never cut or move another trade's installation. Report clashes to your supervisor instead."
    },
    {
      id: 4,
      question: "What is the best way to prevent conflicts before installation?",
      options: ["Work faster than other trades", "Check and follow coordinated site drawings", "Install during night shifts", "Use smaller equipment"],
      correctAnswer: 1,
      explanation: "Checking and following coordinated site drawings before installation is the best way to prevent conflicts."
    },
    {
      id: 5,
      question: "Why is it important not to block access panels?",
      options: ["They look untidy", "Because maintenance and safety access must be preserved", "They are expensive to replace", "Only for aesthetic reasons"],
      correctAnswer: 1,
      explanation: "Access panels must never be blocked because maintenance and safety access to systems must always be preserved."
    },
    {
      id: 6,
      question: "Who is responsible for deciding service routing on site?",
      options: ["The electrician", "The site manager or coordinator", "The first trade to arrive", "The client"],
      correctAnswer: 1,
      explanation: "The site manager or coordinator decides service routing using coordination drawings and site rules."
    },
    {
      id: 7,
      question: "What should you do if you spot a clash on site?",
      options: ["Try to fix it yourself", "Report it to your supervisor immediately", "Ignore it and continue working", "Wait until the end of the day"],
      correctAnswer: 1,
      explanation: "Report potential clashes immediately to your supervisor - early detection prevents costly rework."
    },
    {
      id: 8,
      question: "In risers and ceilings, how should you install services?",
      options: ["Wherever there's space", "Neatly in line with agreed grid systems", "As close to walls as possible", "In the centre only"],
      correctAnswer: 1,
      explanation: "Services should be installed neatly in line with agreed grid systems to maintain organisation and accessibility."
    },
    {
      id: 9,
      question: "Give one example of a common conflict between electrical and plumbing.",
      options: ["Different working hours", "Trunking running where pipework is installed", "Using different suppliers", "Different safety equipment"],
      correctAnswer: 1,
      explanation: "A common conflict is trunking being installed where pipework needs to go, or vice versa, requiring costly rework."
    },
    {
      id: 10,
      question: "True or False: Taking the easiest route is always acceptable.",
      options: ["True - efficiency is important", "False", "True - if time is short", "True - if approved by supervisor"],
      correctAnswer: 1,
      explanation: "False - you should never take the easiest route without checking plans. This often leads to conflicts with other trades."
    }
  ];

  const faqs = [
    {
      question: "Can electricians fix trunking first in a ceiling void?",
      answer: "Only if agreed in the programme. Some trades may need priority access, and the installation sequence must be coordinated to prevent conflicts and ensure all trades can complete their work safely and efficiently."
    },
    {
      question: "Who decides where each trade routes their services?",
      answer: "The site manager or coordinator decides service routing using coordination drawings. These drawings show the agreed positions for all services and must be followed to prevent conflicts."
    },
    {
      question: "What should you do if your run blocks access to another trade's system?",
      answer: "Stop and re-route immediately. Access must always be maintained for safety, maintenance, and operational purposes. Never compromise accessibility for convenience."
    },
    {
      question: "What information should coordination drawings show?",
      answer: "Coordination drawings should show the positions of all services including electrical trunking, conduit, plumbing, HVAC ducts, structural elements, and access requirements for each system."
    },
    {
      question: "How can colour coding help prevent conflicts?",
      answer: "Colour coding helps identify different services quickly and shows which trade is responsible for each installation. This visual system helps prevent accidental interference and improves site organisation."
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
              Back to Section 5
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
              <span className="text-white/60">Section 5.4</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Avoiding Installation Conflicts (e.g., trunking vs pipework)
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Learning how to prevent and resolve conflicts between trades to save time, money, and frustration on site.
            </p>
          </header>

          {/* In 30 Seconds / Spot it */}
          <section className="mb-10">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
                <ul className="text-white/80 text-sm space-y-1 list-disc ml-4">
                  <li>Installation conflicts occur when trades compete for the same space.</li>
                  <li>Common areas include ceiling voids, service risers, and plant rooms.</li>
                  <li>Prevention through coordination drawings saves costly rework.</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
                <ul className="text-white/80 text-sm space-y-1 list-disc ml-4">
                  <li><strong>Spot:</strong> Space constraints, multiple services, tight areas.</li>
                  <li><strong>Use:</strong> Check drawings, mark routes, communicate with trades.</li>
                  <li><strong>Check:</strong> Access maintained, sequencing followed, conflicts reported.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">00</span>
              Learning Outcomes
            </h2>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-start"><span className="text-elec-yellow mr-2">•</span>Recognise common installation conflicts between trades.</li>
              <li className="flex items-start"><span className="text-elec-yellow mr-2">•</span>Read and interpret drawings to spot potential clashes early.</li>
              <li className="flex items-start"><span className="text-elec-yellow mr-2">•</span>Use best practices to route electrical systems efficiently.</li>
              <li className="flex items-start"><span className="text-elec-yellow mr-2">•</span>Communicate with other trades to resolve conflicts quickly.</li>
              <li className="flex items-start"><span className="text-elec-yellow mr-2">•</span>Work to agreed site rules for space allocation.</li>
            </ul>
          </section>

          {/* What Are Installation Conflicts */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              What Are Installation Conflicts?
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Installation conflicts occur when multiple trades attempt to use the same space, leading to costly delays and safety hazards:</p>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-3">Definition and Impact</p>
                <p className="mb-3"><strong>Space conflicts:</strong> When two trades try to install equipment in the same space.</p>
                <ul className="text-sm space-y-1 list-disc ml-4 mb-3">
                  <li>Trunking planned where pipework needs to be installed</li>
                  <li>Cable trays interfering with ductwork routes</li>
                  <li>Equipment blocking access to other services</li>
                  <li>Multiple trades working in confined areas simultaneously</li>
                </ul>
                <p className="mb-3"><strong>Consequences:</strong> Can cause costly delays, damage, and unsafe working conditions.</p>
                <ul className="text-sm space-y-1 list-disc ml-4">
                  <li>Expensive rework and material waste</li>
                  <li>Project delays affecting all trades</li>
                  <li>Increased safety risks from crowded work areas</li>
                  <li>Potential damage to completed installations</li>
                </ul>
              </div>

              <div className="p-3 rounded bg-white/5 border border-white/10">
                <p className="text-sm"><strong>Key principle:</strong> Prevention through planning is always cheaper than correction after installation</p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="conflicts-definition-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* Common Conflict Areas */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Common Conflict Areas
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Understanding where conflicts typically occur helps in planning and prevention:</p>

              <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500/50">
                <p className="font-semibold text-green-400 mb-3">High-Risk Conflict Zones</p>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-white mb-1">Ceiling voids</p>
                    <ul className="text-sm text-white/70 list-disc ml-4 space-y-1">
                      <li>Ducts, trunking, lighting, and sprinkler pipes all require routing</li>
                      <li>Restricted access makes coordination critical</li>
                      <li>Fire compartment integrity must be maintained</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Service risers</p>
                    <ul className="text-sm text-white/70 list-disc ml-4 space-y-1">
                      <li>Multiple services fighting for limited vertical space</li>
                      <li>Access requirements for maintenance and future modifications</li>
                      <li>Fire stopping and compartmentation requirements</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Plant rooms</p>
                    <ul className="text-sm text-white/70 list-disc ml-4 space-y-1">
                      <li>Electrical, plumbing, and HVAC equipment in close proximity</li>
                      <li>Maintenance access essential for all equipment</li>
                      <li>Safety clearances required around electrical equipment</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded bg-white/5 border border-white/10">
                <p className="text-sm"><strong>Planning tip:</strong> Identify these high-risk areas early and ensure detailed coordination drawings are available</p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="conflict-areas-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* Preventing Conflicts */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Preventing Conflicts
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Proactive measures to prevent conflicts before they occur:</p>

              <div className="p-4 rounded-lg bg-purple-500/10 border-l-2 border-purple-500/50">
                <p className="font-semibold text-purple-400 mb-3">Prevention Strategies</p>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-white mb-1">Check coordinated drawings</p>
                    <ul className="text-sm text-white/70 list-disc ml-4 space-y-1">
                      <li>Review all trade drawings for potential clashes</li>
                      <li>Understand the installation sequence and priorities</li>
                      <li>Identify critical dimensions and clearances</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Clear marking and labelling</p>
                    <ul className="text-sm text-white/70 list-disc ml-4 space-y-1">
                      <li>Mark proposed routes before drilling or fixing</li>
                      <li>Use temporary markers to show intended installation paths</li>
                      <li>Coordinate marking systems with other trades</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Space management</p>
                    <ul className="text-sm text-white/70 list-disc ml-4 space-y-1">
                      <li>Allow adequate clearances around all equipment</li>
                      <li>Consider future modifications and additions</li>
                      <li>Maintain access for routine maintenance</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded bg-white/5 border border-white/10">
                <p className="text-sm"><strong>Best practice:</strong> Always plan your route and check for conflicts before starting any installation work</p>
              </div>
            </div>
          </section>

          {/* Resolving Issues */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Resolving Issues
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>When conflicts arise, prompt and proper resolution is essential:</p>

              <div className="p-4 rounded-lg bg-amber-500/10 border-l-2 border-amber-500/50">
                <p className="font-semibold text-amber-400 mb-3">Conflict Resolution Process</p>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-white mb-1">Immediate reporting</p>
                    <ul className="text-sm text-white/70 list-disc ml-4 space-y-1">
                      <li>Stop work in the affected area immediately</li>
                      <li>Document the conflict with photos and measurements</li>
                      <li>Notify all affected trades through proper channels</li>
                      <li>Wait for official resolution before proceeding</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Respect other trades</p>
                    <ul className="text-sm text-white/70 list-disc ml-4 space-y-1">
                      <li>Never modify or remove another trade's work</li>
                      <li>Avoid temporary relocation without permission</li>
                      <li>Maintain professional working relationships</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded bg-white/5 border border-white/10">
                <p className="text-sm"><strong>Remember:</strong> Professional conflict resolution protects relationships and project success</p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="conflict-resolution-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          {/* Practical Guidance */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Practical Guidance
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Practical steps for avoiding conflicts and maintaining professional installations:</p>

              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
                <p className="font-semibold text-red-400 mb-3">Installation Best Practices</p>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-white mb-1">Route marking</p>
                    <ul className="text-sm text-white/70 list-disc ml-4 space-y-1">
                      <li>Use chalk lines or temporary markers for long runs</li>
                      <li>Check for hidden services with detection equipment</li>
                      <li>Verify positions against coordinated drawings</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Smart routing</p>
                    <ul className="text-sm text-white/70 list-disc ml-4 space-y-1">
                      <li>Don't force straight lines through obstacles</li>
                      <li>Use proper fittings and supports for direction changes</li>
                      <li>Maintain minimum bend radii for cables</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Accessibility</p>
                    <ul className="text-sm text-white/70 list-disc ml-4 space-y-1">
                      <li>Never block access to safety equipment</li>
                      <li>Maintain clearances around control panels</li>
                      <li>Consider maintenance requirements in route planning</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded bg-white/5 border border-white/10">
                <p className="text-sm"><strong>Professional standard:</strong> A well-planned installation prevents conflicts and demonstrates professional competence</p>
              </div>
            </div>
          </section>

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Real-World Example
            </h2>
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-amber-400 mb-2">The Costly Riser Conflict</h3>
                  <p className="text-white/80 mb-3">
                    On a commercial project, electricians ran trunking across a service riser before the sprinkler fitters had installed their pipework. When the sprinkler team arrived, they found their route completely blocked.
                  </p>
                  <p className="text-white/80 mb-3"><strong>Impact:</strong> The trunking had to be completely ripped out and reinstalled at a higher level. This cost the project:</p>
                  <ul className="text-sm text-white/70 list-disc ml-4 mb-3 space-y-1">
                    <li>Three days of additional labour costs</li>
                    <li>Wasted materials and disposal costs</li>
                    <li>Delay to the sprinkler installation</li>
                    <li>Knock-on delays to other trades</li>
                    <li>Damaged relationships between trades</li>
                  </ul>
                  <p className="text-white/80">
                    <strong>Prevention:</strong> A simple check of the coordination drawings would have shown the sprinkler route and prevented this costly conflict entirely.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              FAQs
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h3 className="font-medium text-white mb-2">{faq.question}</h3>
                  <p className="text-sm text-white/70">{faq.answer}</p>
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
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <div className="flex items-start gap-3">
                <Clipboard className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <div className="grid md:grid-cols-2 gap-4 w-full">
                  <div>
                    <p className="font-medium text-white mb-2">Prevention Checklist</p>
                    <ul className="text-sm text-white/70 list-disc ml-4 space-y-1">
                      <li>Check and follow coordinated site drawings</li>
                      <li>Mark out proposed routes before fixing</li>
                      <li>Never block access panels or safety equipment</li>
                      <li>Report clashes immediately to supervisors</li>
                      <li>Use colour coding and clear labelling</li>
                      <li>Leave space for expansion and maintenance</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-2">Installation Standards</p>
                    <ul className="text-sm text-white/70 list-disc ml-4 space-y-1">
                      <li>Use bends and risers to avoid obstacles</li>
                      <li>Respect agreed trade sequencing</li>
                      <li>Install neatly in line with grid systems</li>
                      <li>Maintain proper separation from hot pipes</li>
                      <li>Ensure accessibility for maintenance</li>
                      <li>Follow BS 7671 cable routing requirements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 rounded-lg border border-elec-yellow/30">
              <p className="text-sm font-medium text-elec-yellow">Quick Reference:</p>
              <p className="text-xs text-white/70">Always check → Mark out → Coordinate → Install → Document</p>
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Recap
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white/80 mb-3">
                    You've learned what installation conflicts are, where they occur, and how to avoid them. By checking drawings, following site rules, and working with other trades, you can prevent costly rework and ensure a professional installation that meets all requirements and maintains excellent working relationships.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-semibold text-white mb-2">Key Skills Developed:</p>
                      <ul className="text-white/70 list-disc ml-4 space-y-1">
                        <li>Identifying potential conflict zones</li>
                        <li>Reading and interpreting coordination drawings</li>
                        <li>Implementing proper marking systems</li>
                        <li>Understanding trade sequencing principles</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-white mb-2">Professional Benefits:</p>
                      <ul className="text-white/70 list-disc ml-4 space-y-1">
                        <li>Reduced project delays and rework</li>
                        <li>Improved trade relationships</li>
                        <li>Enhanced professional reputation</li>
                        <li>Better site safety</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">10</span>
              Quiz (10 Questions)
            </h2>
            <Quiz questions={quizQuestions} />
          </section>

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../5-3">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Coordinating with Other Trades
              </Link>
            </Button>

            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../5-5">
                Next: Attending Briefings and Meetings
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module5Section5_4;
