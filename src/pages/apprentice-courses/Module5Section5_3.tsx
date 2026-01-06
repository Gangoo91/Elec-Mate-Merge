import { ArrowLeft, ArrowRight, Users, CheckCircle, AlertTriangle, Shield, Eye, HelpCircle, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Coordinating with Joiners, Plumbers, Plasterers - Module 5.5.3 | Level 2 Electrical Course";
const DESCRIPTION = "Master essential coordination skills for working with other trades on construction sites. Learn multi-trade coordination and communication techniques for efficient project delivery.";

// Inline check questions
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
      options: [
        "To prevent delays, clashes, and rework",
        "To show authority over other trades",
        "To speed up your own work only",
        "To avoid talking to supervisors"
      ],
      correctAnswer: 0,
      explanation: "Coordination with other trades is essential to prevent delays, clashes, and costly rework that can affect the entire project schedule and budget."
    },
    {
      id: 2,
      question: "Who installs stud walls and fittings that may affect electrical containment?",
      options: [
        "Plumbers",
        "Joiners",
        "Plasterers", 
        "Painters"
      ],
      correctAnswer: 1,
      explanation: "Joiners install stud walls, floors, and fittings. Electrical containment often needs to be coordinated with their work schedule."
    },
    {
      id: 3,
      question: "What must be installed before plastering begins?",
      options: [
        "Light fittings only",
        "Cable tray only",
        "Electrical boxes and conduits",
        "Final connections"
      ],
      correctAnswer: 2,
      explanation: "Electrical boxes and conduits must be properly installed and positioned before plasterers begin their work to avoid having to cut back plaster later."
    },
    {
      id: 4,
      question: "True or False: You can move plumbing pipework if it's in your way.",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 1,
      explanation: "False. You should never move or interfere with another trade's work without proper approval from supervisors. This could affect their system integrity."
    },
    {
      id: 5,
      question: "Which trade is responsible for installing heating systems and drainage?",
      options: [
        "Joiners",
        "Electricians",
        "Plumbers",
        "Plasterers"
      ],
      correctAnswer: 2,
      explanation: "Plumbers install pipework, heating systems, and drainage. Careful planning is needed to avoid clashes between pipes and cable runs."
    },
    {
      id: 6,
      question: "What should you use to mark out electrical positions before plastering?",
      options: [
        "Nothing - just remember the positions",
        "Spray markers, chalk, or tape",
        "Permanent marker on walls",
        "Sticky notes"
      ],
      correctAnswer: 1,
      explanation: "Use spray markers, chalk, or tape to clearly mark electrical positions. This ensures plasterers can work around electrical installations properly."
    },
    {
      id: 7,
      question: "Who should you report a clash with another trade to?",
      options: [
        "The other trade directly",
        "Your supervisor/foreman",
        "The client",
        "No one - resolve it yourself"
      ],
      correctAnswer: 1,
      explanation: "Always report clashes to your supervisor or foreman. They have the authority and knowledge to coordinate between trades properly."
    },
    {
      id: 8,
      question: "What is a common issue between electricians and plasterers?",
      options: [
        "Competing for workspace",
        "Socket boxes being plastered over",
        "Different working hours",
        "Tool sharing disputes"
      ],
      correctAnswer: 1,
      explanation: "Socket boxes being plastered over is a common issue. Ensure boxes are properly fixed, flush, and clearly marked before plastering begins."
    },
    {
      id: 9,
      question: "What should you do before drilling through shared walls or joists?",
      options: [
        "Drill immediately if urgent",
        "Check with joiners or plumbers",
        "Use the largest drill bit available",
        "Ignore other trades' requirements"
      ],
      correctAnswer: 1,
      explanation: "Always check with joiners or plumbers before drilling through shared structural elements to avoid damaging their installations."
    },
    {
      id: 10,
      question: "True or False: Proper coordination only benefits electricians.",
      options: [
        "True",
        "False"
      ],
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
    <div className="min-h-screen bg-[#121212]">
      {/* Top header bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 5
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
              <Users className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 5.5.3
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Coordinating with Joiners, Plumbers, Plasterers, etc.
          </h1>
          <p className="text-white">
            Master essential coordination skills for working effectively with other trades on construction sites.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Multi-trade coordination prevents costly clashes and delays on construction sites.</li>
                <li>Mark electrical runs clearly before other trades start their work.</li>
                <li>Always report coordination issues to supervisors - never resolve clashes independently.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Conduit vs pipe clashes, boxes being plastered over, access blockages.</li>
                <li><strong>Use:</strong> Clear marking, advance communication, trade sequence planning.</li>
                <li><strong>Check:</strong> Site programmes, drawing coordination, other trades' schedules.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>Recognise the roles and responsibilities of common building trades.</li>
            <li>Understand the importance of trade sequencing in construction projects.</li>
            <li>Apply effective communication techniques for multi-trade coordination.</li>
            <li>Prevent and resolve coordination conflicts through proper planning and procedures.</li>
          </ul>
        </Card>

        {/* Content Cards */}
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                Understanding Other Trades
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Joiners/Carpenters:</strong> Install timber frameworks, flooring, and fitted units that often house electrical equipment</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Plumbers:</strong> Install water supply, heating, and drainage systems that must be separated from electrical installations</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Plasterers:</strong> Apply wall and ceiling finishes that require all electrical first-fix work to be completed</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span><strong>HVAC Technicians:</strong> Install heating, ventilation, and air conditioning systems using shared ceiling and wall spaces</span>
                </div>
              </div>

              <div className="bg-emerald-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="font-medium text-blue-900 dark:text-blue-100">
                  Each trade has specific installation sequences and requirements that directly impact electrical work timing and positioning.
                </p>
              </div>

              <InlineCheck 
                id="trades-understanding-check"
                question="Which trade typically requires all electrical first-fix work to be completed before they start?"
                options={[
                  "Joiners",
                  "Plumbers",
                  "Plasterers",
                  "HVAC technicians"
                ]}
                correctIndex={2}
                explanation="Plasterers require all electrical first-fix work (cables, boxes, conduits) to be completed and properly positioned before they can apply wall and ceiling finishes."
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                Trade Sequencing and Planning
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3">Construction Phase Breakdown:</h4>
                  <div className="space-y-3">
                    <div className="border-l-4 border-elec-yellow pl-4">
                      <p><strong>First Fix Phase:</strong> Structural work complete, basic services installation, cable containment routes established. This is when electrical framework and rough-in work occurs.</p>
                    </div>
                    <div className="border-l-4 border-elec-yellow pl-4">
                      <p><strong>Coordination Phase:</strong> Multiple trades working simultaneously - the most critical coordination period. Requires constant communication and schedule awareness.</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <p><strong>Second Fix Phase:</strong> Final connections, accessories installation, testing and commissioning after finishes are applied.</p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-4">
                      <p><strong>Handover Phase:</strong> Final inspections, documentation, coordinated system testing, and client training.</p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-[#121212]/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3 text-blue-700 dark:text-elec-yellow">Typical Sequence:</h4>
                    <ol className="space-y-2 text-sm list-decimal pl-6">
                      <li><strong>Week 1-2:</strong> Structural/building fabric completion</li>
                      <li><strong>Week 3-4:</strong> Electrical first fix (cables, conduits, boxes)</li>
                      <li><strong>Week 4-5:</strong> Plumbing first fix (pipes, waste, heating)</li>
                      <li><strong>Week 5-6:</strong> HVAC ductwork and mechanical systems</li>
                      <li><strong>Week 6-7:</strong> Insulation and boarding installation</li>
                      <li><strong>Week 7-8:</strong> Plastering and wall finishes</li>
                      <li><strong>Week 9-10:</strong> Electrical second fix (accessories, testing)</li>
                      <li><strong>Week 11:</strong> Final commissioning and handover</li>
                    </ol>
                  </div>
                  <div className="bg-gray-50 dark:bg-[#121212]/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3 text-red-700 dark:text-elec-yellow">Critical Coordination Points:</h4>
                    <ul className="space-y-2 text-sm">
                      <li><strong>Cable route planning:</strong> Avoid HVAC ducts and plumbing runs</li>
                      <li><strong>Ceiling void access:</strong> Coordinate with other services installation</li>
                      <li><strong>Wall cavity usage:</strong> Share space efficiently with other trades</li>
                      <li><strong>Penetration coordination:</strong> Plan holes through structural elements</li>
                      <li><strong>Access for maintenance:</strong> Ensure long-term accessibility</li>
                      <li><strong>Testing schedules:</strong> Coordinate system commissioning</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                  <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">Real-World Scheduling Example:</h4>
                  <p className="text-orange-800 dark:text-orange-200 text-sm">
                    On a typical office fit-out, electricians install cable containment in weeks 3-4, plumbers install heating pipes in weeks 4-5, 
                    and plasterers start in week 7. This overlap requires daily coordination to prevent the electrical trunking blocking 
                    access to plumbing isolators or pipe joints.
                  </p>
                </div>
              </div>

              <InlineCheck 
                id="sequencing-check"
                question="When should electrical first fix work typically be completed in relation to other trades?"
                options={[
                  "After plastering to avoid damage",
                  "Before plumbing to establish priority",
                  "After structural work but before plastering",
                  "Last, after all other trades finish"
                ]}
                correctIndex={2}
                explanation="Electrical first fix should be completed after structural work but before plastering to ensure all cables and boxes are properly installed and positioned for the plastering trade to work around."
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                Communication and Documentation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Critical Communication Requirements
                </h4>
                <div className="space-y-2 text-red-800 dark:text-red-200">
                  <p>• Always inform other trades before starting work that affects them</p>
                  <p>• Mark out electrical positions clearly using spray markers or tape</p>
                  <p>• Check site programmes to understand other trades' schedules</p>
                  <p>• Report any clashes or conflicts to supervisors immediately</p>
                </div>
              </div>

              <div className="space-y-3">
                <p><strong>Programme coordination:</strong> Review weekly and daily work schedules with other trades</p>
                <p><strong>Position marking:</strong> Use bright, temporary markers to show electrical installation positions</p>
                <p><strong>Access planning:</strong> Coordinate shared workspace usage and equipment access</p>
                <p><strong>Change management:</strong> Document and communicate any modifications to planned work</p>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800">
                <h4 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2 flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Spot it / Use it
                </h4>
                <p className="text-emerald-800 dark:text-emerald-200">
                  Look for coordination meetings on site programmes. These are your opportunities to raise concerns 
                  and understand how your work fits with other trades.
                </p>
              </div>

              <InlineCheck 
                id="communication-check"
                question="What should you do if you find a clash between your electrical work and plumbing?"
                options={[
                  "Move the plumbing pipes yourself",
                  "Ignore it and work around it",
                  "Report it to your supervisor immediately",
                  "Ask the plumber to move their work"
                ]}
                correctIndex={2}
                explanation="Always report clashes to your supervisor immediately. They have the authority to coordinate between trades and find proper solutions."
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
                Common Coordination Issues
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <p><strong>Service clashes:</strong> Cable routes conflicting with plumbing, HVAC ducts, or structural elements</p>
                <p><strong>Access conflicts:</strong> Installation work blocking other trades from reaching their equipment</p>
                <p><strong>Timing issues:</strong> Late electrical work preventing other trades from completing their installations</p>
                <p><strong>Space conflicts:</strong> Multiple trades requiring the same ceiling or wall cavity space</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">Prevention Strategies:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Review drawings for potential clashes</li>
                    <li>Attend coordination meetings</li>
                    <li>Mark positions before installation</li>
                    <li>Communicate schedule changes early</li>
                    <li>Use temporary protection systems</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">Resolution Process:</h4>
                  <ol className="list-decimal pl-6 space-y-1">
                    <li>Stop work immediately</li>
                    <li>Document the issue</li>
                    <li>Report to supervisor</li>
                    <li>Await instructions</li>
                    <li>Implement approved solution</li>
                  </ol>
                </div>
              </div>

              <InlineCheck 
                id="issues-check"
                question="What is the first step when you discover a service clash?"
                options={[
                  "Try to work around it",
                  "Stop work and document the issue",
                  "Ask another trade to move their work",
                  "Continue and report it later"
                ]}
                correctIndex={1}
                explanation="Stop work immediately and document the clash. This prevents making the situation worse and provides clear information for your supervisor to resolve the issue."
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</span>
                Site Safety and Professional Relationships
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <p><strong>Respect boundaries:</strong> Never interfere with another trade's work, tools, or materials without permission</p>
                <p><strong>Safety compliance:</strong> Ensure your work doesn't create hazards for other trades</p>
                <p><strong>Professional courtesy:</strong> Clean up after your work and protect others' installations</p>
                <p><strong>Collaborative approach:</strong> Work together to find solutions that benefit the whole project</p>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Professional Benefits:</h4>
                <ul className="list-disc pl-6 space-y-1 text-amber-800 dark:text-amber-200">
                  <li>Builds positive working relationships for future projects</li>
                  <li>Creates collaborative problem-solving opportunities</li>
                  <li>Reduces site conflicts and tension</li>
                  <li>Improves overall project efficiency and quality</li>
                  <li>Enhances your reputation as a reliable tradesperson</li>
                </ul>
              </div>

              <InlineCheck 
                id="relationships-check"
                question="Why is building good relationships with other trades important?"
                options={[
                  "It's not really important",
                  "Only for large construction sites",
                  "Creates collaborative opportunities and improves project efficiency",
                  "Just for social reasons"
                ]}
                correctIndex={2}
                explanation="Good relationships create collaborative problem-solving opportunities, reduce conflicts, improve project efficiency, and enhance your professional reputation."
              />
            </CardContent>
          </Card>
        </div>

        {/* Real-World Example */}
        <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
              <Users className="w-5 h-5" />
              Real-World Example
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-amber-800 dark:text-amber-200">
              <p className="font-medium">The Cable Tray Clash Crisis</p>
              <p>
                On a new office building project, an apprentice electrician installed a large cable tray across 
                a ceiling void without checking the mechanical drawings. When the HVAC contractors arrived to 
                install their main ductwork, they found their route completely blocked.
              </p>
              
              <div className="bg-amber-100 dark:bg-amber-900/50 p-3 rounded-lg border border-amber-300 dark:border-amber-700">
                <p className="font-medium mb-2">Consequences:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Complete removal and reinstallation of 150m of cable tray</li>
                  <li>Two-day delay to the HVAC installation programme</li>
                  <li>Additional scaffold hire costs for reworking</li>
                  <li>Knock-on delays affecting plastering and fit-out trades</li>
                  <li>Client complaint about poor coordination</li>
                </ul>
              </div>
              
              <p className="font-medium">
                Total cost: £2,800 in materials, labour, and programme delays. This could have been prevented by 
                checking coordination drawings and attending the weekly trade coordination meeting.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* FAQs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <p className="font-semibold">Q: {faq.question}</p>
                  <p className="text-white">A: {faq.answer}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pocket Guide */}
        <Card className="border-green-200 bg-green-50 dark:bg-green-950/30 dark:border-green-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-900 dark:text-green-100">
              <Book className="w-5 h-5" />
              Pocket Guide: Multi-Trade Coordination
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-green-800 dark:text-green-200">
              <div className="space-y-2">
                <p>✓ Know the construction sequence and your place in it</p>
                <p>✓ Mark electrical positions clearly before other trades start</p>
                <p>✓ Check site programmes regularly for trade schedules</p>
                <p>✓ Report clashes to supervisors immediately</p>
              </div>
              <div className="space-y-2">
                <p>✓ Never move another trade's work without permission</p>
                <p>✓ Attend coordination meetings when possible</p>
                <p>✓ Protect your installations from other trades' work</p>
                <p>✓ Build positive professional relationships</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recap */}
        <Card>
          <CardHeader>
            <CardTitle>Recap</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">In this subsection, you learned:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The roles and responsibilities of common building trades</li>
              <li>The importance of trade sequencing and programme coordination</li>
              <li>Effective communication techniques for multi-trade environments</li>
              <li>Common coordination issues and how to prevent them</li>
              <li>Professional approaches to building positive working relationships</li>
            </ul>
            <p className="mt-4 font-medium text-primary">
              Effective multi-trade coordination ensures project success, maintains safety standards, and builds your reputation as a professional electrician.
            </p>
          </CardContent>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} />

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8">
          <Link to="../5-2">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Communicating with Site Supervisors
            </Button>
          </Link>
          <Link to="../5-4">
            <Button>
              Next: Avoiding Installation Conflicts
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Module5Section5_3;