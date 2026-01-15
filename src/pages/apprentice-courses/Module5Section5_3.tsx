import { ArrowLeft, ArrowRight, Users, CheckCircle, AlertTriangle, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Coordinating with Joiners, Plumbers, Plasterers - Module 5.5.3 | Level 2 Electrical Course";
const DESCRIPTION = "Master essential coordination skills for working with other trades on construction sites. Learn multi-trade coordination and communication techniques for efficient project delivery.";

const quickCheckQuestions = [
  {
    id: 1,
    question: "Who should you report a clash with another trade to?",
    options: ["The other trade directly", "The client", "Your supervisor/foreman", "No one - resolve it yourself"],
    correctIndex: 2,
    explanation: "Always report clashes to your supervisor or foreman. They have the authority and knowledge to coordinate between trades properly."
  },
  {
    id: 2,
    question: "What should you use to mark electrical positions before plastering?",
    options: ["Nothing - just remember", "Spray markers, chalk, or tape", "Permanent marker on walls", "Sticky notes"],
    correctIndex: 1,
    explanation: "Use spray markers, chalk, or tape to clearly mark electrical positions. This ensures plasterers can work around electrical installations properly."
  },
  {
    id: 3,
    question: "True or False: You can move plumbing pipework if it's in your way.",
    options: ["True - if it's urgent", "False - never without approval"],
    correctIndex: 1,
    explanation: "False. You should never move or interfere with another trade's work without proper approval from supervisors."
  }
];

const Module5Section5_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "Why is coordination with other trades important?",
      options: ["To prevent delays, clashes, and rework", "To show authority over other trades", "To speed up your own work only", "To avoid talking to supervisors"],
      correctAnswer: 0,
      explanation: "Coordination with other trades is essential to prevent delays, clashes, and costly rework that can affect the entire project schedule and budget."
    },
    {
      id: 2,
      question: "Who installs stud walls and fittings that may affect electrical containment?",
      options: ["Plumbers", "Joiners", "Plasterers", "Painters"],
      correctAnswer: 1,
      explanation: "Joiners install stud walls, floors, and fittings. Electrical containment often needs to be coordinated with their work schedule."
    },
    {
      id: 3,
      question: "What must be installed before plastering begins?",
      options: ["Light fittings only", "Cable tray only", "Electrical boxes and conduits", "Final connections"],
      correctAnswer: 2,
      explanation: "Electrical boxes and conduits must be properly installed and positioned before plasterers begin their work to avoid having to cut back plaster later."
    },
    {
      id: 4,
      question: "True or False: You can move plumbing pipework if it's in your way.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. You should never move or interfere with another trade's work without proper approval from supervisors. This could affect their system integrity."
    },
    {
      id: 5,
      question: "Which trade is responsible for installing heating systems and drainage?",
      options: ["Joiners", "Electricians", "Plumbers", "Plasterers"],
      correctAnswer: 2,
      explanation: "Plumbers install pipework, heating systems, and drainage. Careful planning is needed to avoid clashes between pipes and cable runs."
    },
    {
      id: 6,
      question: "What should you use to mark out electrical positions before plastering?",
      options: ["Nothing - just remember the positions", "Spray markers, chalk, or tape", "Permanent marker on walls", "Sticky notes"],
      correctAnswer: 1,
      explanation: "Use spray markers, chalk, or tape to clearly mark electrical positions. This ensures plasterers can work around electrical installations properly."
    },
    {
      id: 7,
      question: "Who should you report a clash with another trade to?",
      options: ["The other trade directly", "Your supervisor/foreman", "The client", "No one - resolve it yourself"],
      correctAnswer: 1,
      explanation: "Always report clashes to your supervisor or foreman. They have the authority and knowledge to coordinate between trades properly."
    },
    {
      id: 8,
      question: "What is a common issue between electricians and plasterers?",
      options: ["Competing for workspace", "Socket boxes being plastered over", "Different working hours", "Tool sharing disputes"],
      correctAnswer: 1,
      explanation: "Socket boxes being plastered over is a common issue. Ensure boxes are properly fixed, flush, and clearly marked before plastering begins."
    },
    {
      id: 9,
      question: "What should you do before drilling through shared walls or joists?",
      options: ["Drill immediately if urgent", "Check with joiners or plumbers", "Use the largest drill bit available", "Ignore other trades' requirements"],
      correctAnswer: 1,
      explanation: "Always check with joiners or plumbers before drilling through shared structural elements to avoid damaging their installations."
    },
    {
      id: 10,
      question: "True or False: Proper coordination only benefits electricians.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. Proper coordination benefits all trades and the entire project by reducing delays, preventing rework, and maintaining safety standards."
    }
  ];

  const faqs = [
    {
      question: "How early should I communicate with other trades about my work?",
      answer: "Start coordination discussions during planning meetings and provide advance notice whenever possible. Last-minute communication often leads to conflicts and delays."
    },
    {
      question: "What should I do if I discover a clash that wasn't shown on drawings?",
      answer: "Stop work immediately and report to your supervisor. Document the clash with photos and measurements, and wait for authorization before proceeding with any changes."
    },
    {
      question: "Can I temporarily move another trade's equipment to access my work area?",
      answer: "Never move another trade's equipment without permission. Ask the trade directly or coordinate through your supervisor to arrange temporary access."
    },
    {
      question: "How do I coordinate when multiple trades need the same space?",
      answer: "Work with your supervisor to establish a work sequence. Often this involves temporary installations, phased access, or coordinated installation schedules."
    },
    {
      question: "What if a plasterer has already covered my electrical boxes?",
      answer: "Report immediately to your supervisor. The plaster will need to be carefully cut back, which may delay the decoration schedule and require additional costs."
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
              <span className="text-white/60">Section 5.3</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Coordinating with Joiners, Plumbers, Plasterers, etc.
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Master essential coordination skills for working effectively with other trades on construction sites.
            </p>
          </header>

          {/* In 30 Seconds / Spot it */}
          <section className="mb-10">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
                <ul className="text-white/80 text-sm space-y-1 list-disc ml-4">
                  <li>Multi-trade coordination prevents costly clashes and delays on construction sites.</li>
                  <li>Mark electrical runs clearly before other trades start their work.</li>
                  <li>Always report coordination issues to supervisors - never resolve clashes independently.</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
                <ul className="text-white/80 text-sm space-y-1 list-disc ml-4">
                  <li><strong>Spot:</strong> Conduit vs pipe clashes, boxes being plastered over, access blockages.</li>
                  <li><strong>Use:</strong> Clear marking, advance communication, trade sequence planning.</li>
                  <li><strong>Check:</strong> Site programmes, drawing coordination, other trades' schedules.</li>
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
              <li className="flex items-start"><span className="text-elec-yellow mr-2">•</span>Recognise the roles and responsibilities of common building trades.</li>
              <li className="flex items-start"><span className="text-elec-yellow mr-2">•</span>Understand the importance of trade sequencing in construction projects.</li>
              <li className="flex items-start"><span className="text-elec-yellow mr-2">•</span>Apply effective communication techniques for multi-trade coordination.</li>
              <li className="flex items-start"><span className="text-elec-yellow mr-2">•</span>Prevent and resolve coordination conflicts through proper planning and procedures.</li>
            </ul>
          </section>

          {/* Understanding Other Trades */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Understanding Other Trades
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                  <CheckCircle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong>Joiners/Carpenters:</strong> Install timber frameworks, flooring, and fitted units that often house electrical equipment</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                  <CheckCircle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong>Plumbers:</strong> Install water supply, heating, and drainage systems that must be separated from electrical installations</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                  <CheckCircle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong>Plasterers:</strong> Apply wall and ceiling finishes that require all electrical first-fix work to be completed</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                  <CheckCircle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong>HVAC Technicians:</strong> Install heating, ventilation, and air conditioning systems using shared ceiling and wall spaces</span>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm text-white/70">
                  <strong>Key Principle:</strong> Each trade has specific installation sequences and requirements that directly impact electrical work timing and positioning.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="trades-understanding-check"
            question="Which trade typically requires all electrical first-fix work to be completed before they start?"
            options={["Joiners", "Plumbers", "Plasterers", "HVAC technicians"]}
            correctIndex={2}
            explanation="Plasterers require all electrical first-fix work (cables, boxes, conduits) to be completed and properly positioned before they can apply wall and ceiling finishes."
          />

          {/* Trade Sequencing and Planning */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Trade Sequencing and Planning
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="font-semibold text-elec-yellow mb-2">First Fix Phase</p>
                  <p className="text-sm">Structural work complete, basic services installation, cable containment routes established. This is when electrical framework and rough-in work occurs.</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border-l-2 border-white/20">
                  <p className="font-semibold text-white mb-2">Coordination Phase</p>
                  <p className="text-sm text-white/70">Multiple trades working simultaneously - the most critical coordination period. Requires constant communication and schedule awareness.</p>
                </div>
                <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500/50">
                  <p className="font-semibold text-green-400 mb-2">Second Fix Phase</p>
                  <p className="text-sm text-white/70">Final connections, accessories installation, testing and commissioning after finishes are applied.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-semibold text-elec-yellow mb-3">Typical Sequence</h4>
                  <ol className="space-y-1 text-sm text-white/70 list-decimal pl-4">
                    <li>Structural/building fabric completion</li>
                    <li>Electrical first fix (cables, conduits, boxes)</li>
                    <li>Plumbing first fix (pipes, waste, heating)</li>
                    <li>HVAC ductwork and mechanical systems</li>
                    <li>Insulation and boarding installation</li>
                    <li>Plastering and wall finishes</li>
                    <li>Electrical second fix (accessories, testing)</li>
                    <li>Final commissioning and handover</li>
                  </ol>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-semibold text-elec-yellow mb-3">Critical Coordination Points</h4>
                  <ul className="space-y-1 text-sm text-white/70">
                    <li>• Cable route planning - avoid HVAC and plumbing</li>
                    <li>• Ceiling void access coordination</li>
                    <li>• Wall cavity usage sharing</li>
                    <li>• Penetration coordination</li>
                    <li>• Access for maintenance</li>
                    <li>• Testing schedules</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <h4 className="font-semibold text-amber-400 mb-2">Real-World Scheduling Example</h4>
                <p className="text-sm text-white/70">
                  On a typical office fit-out, electricians install cable containment in weeks 3-4, plumbers install heating pipes in weeks 4-5, and plasterers start in week 7. This overlap requires daily coordination to prevent the electrical trunking blocking access to plumbing isolators or pipe joints.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="sequencing-check"
            question="When should electrical first fix work typically be completed in relation to other trades?"
            options={["After plastering to avoid damage", "Before plumbing to establish priority", "After structural work but before plastering", "Last, after all other trades finish"]}
            correctIndex={2}
            explanation="Electrical first fix should be completed after structural work but before plastering to ensure all cables and boxes are properly installed and positioned for the plastering trade to work around."
          />

          {/* Communication and Documentation */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Communication and Documentation
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-red-400 mb-2">Critical Communication Requirements</h4>
                    <ul className="text-sm text-white/70 space-y-1">
                      <li>• Always inform other trades before starting work that affects them</li>
                      <li>• Mark out electrical positions clearly using spray markers or tape</li>
                      <li>• Check site programmes to understand other trades' schedules</li>
                      <li>• Report any clashes or conflicts to supervisors immediately</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p><strong>Programme coordination:</strong> Review weekly and daily work schedules with other trades</p>
                <p><strong>Position marking:</strong> Use bright, temporary markers to show electrical installation positions</p>
                <p><strong>Access planning:</strong> Coordinate shared workspace usage and equipment access</p>
                <p><strong>Change management:</strong> Document and communicate any modifications to planned work</p>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2">Spot it / Use it</p>
                <p className="text-sm text-white/70">
                  Look for coordination meetings on site programmes. These are your opportunities to raise concerns and understand how your work fits with other trades.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="communication-check"
            question="What should you do if you find a clash between your electrical work and plumbing?"
            options={["Move the plumbing pipes yourself", "Ignore it and work around it", "Report it to your supervisor immediately", "Ask the plumber to move their work"]}
            correctIndex={2}
            explanation="Always report clashes to your supervisor immediately. They have the authority to coordinate between trades and find proper solutions."
          />

          {/* Common Coordination Issues */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Common Coordination Issues
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="space-y-2">
                <p><strong>Service clashes:</strong> Cable routes conflicting with plumbing, HVAC ducts, or structural elements</p>
                <p><strong>Access conflicts:</strong> Installation work blocking other trades from reaching their equipment</p>
                <p><strong>Timing issues:</strong> Late electrical work preventing other trades from completing their installations</p>
                <p><strong>Space conflicts:</strong> Multiple trades requiring the same ceiling or wall cavity space</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">Prevention Strategies</h4>
                  <ul className="text-sm text-white/70 list-disc ml-4 space-y-1">
                    <li>Review drawings for potential clashes</li>
                    <li>Attend coordination meetings</li>
                    <li>Mark positions before installation</li>
                    <li>Communicate schedule changes early</li>
                    <li>Use temporary protection systems</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">Resolution Process</h4>
                  <ol className="text-sm text-white/70 list-decimal ml-4 space-y-1">
                    <li>Stop work immediately</li>
                    <li>Document the issue</li>
                    <li>Report to supervisor</li>
                    <li>Await instructions</li>
                    <li>Implement approved solution</li>
                  </ol>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="issues-check"
            question="What is the first step when you discover a service clash?"
            options={["Try to work around it", "Stop work and document the issue", "Ask another trade to move their work", "Continue and report it later"]}
            correctIndex={1}
            explanation="Stop work immediately and document the clash. This prevents making the situation worse and provides clear information for your supervisor to resolve the issue."
          />

          {/* Site Safety and Professional Relationships */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Site Safety and Professional Relationships
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="space-y-2">
                <p><strong>Respect boundaries:</strong> Never interfere with another trade's work, tools, or materials without permission</p>
                <p><strong>Safety compliance:</strong> Ensure your work doesn't create hazards for other trades</p>
                <p><strong>Professional courtesy:</strong> Clean up after your work and protect others' installations</p>
                <p><strong>Collaborative approach:</strong> Work together to find solutions that benefit the whole project</p>
              </div>

              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <h4 className="font-semibold text-amber-400 mb-2">Professional Benefits</h4>
                <ul className="text-sm text-white/70 list-disc ml-4 space-y-1">
                  <li>Builds positive working relationships for future projects</li>
                  <li>Creates collaborative problem-solving opportunities</li>
                  <li>Reduces site conflicts and tension</li>
                  <li>Improves overall project efficiency and quality</li>
                  <li>Enhances your reputation as a reliable tradesperson</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="relationships-check"
            question="Why is building good relationships with other trades important?"
            options={["It's not really important", "Only for large construction sites", "Creates collaborative opportunities and improves project efficiency", "Just for social reasons"]}
            correctIndex={2}
            explanation="Good relationships create collaborative problem-solving opportunities, reduce conflicts, improve project efficiency, and enhance your professional reputation."
          />

          {/* Real-World Example */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Real-World Example
            </h2>
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-amber-400 mb-2">The Cable Tray Clash Crisis</p>
                  <p className="text-white/80 mb-3">
                    On a new office building project, an apprentice electrician installed a large cable tray across a ceiling void without checking the mechanical drawings. When the HVAC contractors arrived to install their main ductwork, they found their route completely blocked.
                  </p>
                  <div className="p-3 rounded bg-white/5 border border-white/10 mb-3">
                    <p className="font-medium text-white mb-2">Consequences:</p>
                    <ul className="text-sm text-white/70 list-disc ml-4 space-y-1">
                      <li>Complete removal and reinstallation of 150m of cable tray</li>
                      <li>Two-day delay to the HVAC installation programme</li>
                      <li>Additional scaffold hire costs for reworking</li>
                      <li>Knock-on delays affecting plastering and fit-out trades</li>
                      <li>Client complaint about poor coordination</li>
                    </ul>
                  </div>
                  <p className="text-white/80">
                    <strong>Total cost: £2,800</strong> in materials, labour, and programme delays. This could have been prevented by checking coordination drawings and attending the weekly trade coordination meeting.
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
                  <p className="font-semibold text-white mb-2">Q: {faq.question}</p>
                  <p className="text-sm text-white/70">A: {faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Pocket Guide: Multi-Trade Coordination
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="space-y-2">
                  <div className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-elec-yellow mt-0.5" /><span className="text-sm text-white/80">Know the construction sequence and your place in it</span></div>
                  <div className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-elec-yellow mt-0.5" /><span className="text-sm text-white/80">Mark electrical positions clearly before other trades start</span></div>
                  <div className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-elec-yellow mt-0.5" /><span className="text-sm text-white/80">Check site programmes regularly for trade schedules</span></div>
                  <div className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-elec-yellow mt-0.5" /><span className="text-sm text-white/80">Report clashes to supervisors immediately</span></div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="space-y-2">
                  <div className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-elec-yellow mt-0.5" /><span className="text-sm text-white/80">Never move another trade's work without permission</span></div>
                  <div className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-elec-yellow mt-0.5" /><span className="text-sm text-white/80">Attend coordination meetings when possible</span></div>
                  <div className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-elec-yellow mt-0.5" /><span className="text-sm text-white/80">Protect your installations from other trades' work</span></div>
                  <div className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-elec-yellow mt-0.5" /><span className="text-sm text-white/80">Build positive professional relationships</span></div>
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
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white/80 mb-3">In this subsection, you learned:</p>
                  <ul className="text-sm text-white/70 list-disc ml-4 space-y-1">
                    <li>The roles and responsibilities of common building trades</li>
                    <li>The importance of trade sequencing and programme coordination</li>
                    <li>Effective communication techniques for multi-trade environments</li>
                    <li>Common coordination issues and how to prevent them</li>
                    <li>Professional approaches to building positive working relationships</li>
                  </ul>
                  <p className="text-white/80 mt-3">
                    <strong>Effective multi-trade coordination ensures project success, maintains safety standards, and builds your reputation as a professional electrician.</strong>
                  </p>
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
              <Link to="../5-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Communicating with Supervisors
              </Link>
            </Button>

            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../5-4">
                Next: Avoiding Installation Conflicts
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module5Section5_3;
