import { ArrowLeft, ArrowRight, Shield, Target, CheckCircle, AlertTriangle, Wrench, HardHat, Users, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Safe Manual Handling of Equipment and Materials - Module 4.7.1 | Level 2 Electrical Course";
const DESCRIPTION = "Learn safe manual handling techniques for electrical equipment and materials. Master lifting techniques, mechanical aids, and legal requirements to prevent workplace injuries.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "Which regulation covers manual handling safety?",
    options: ["Manual Handling Operations Regulations 1992 (MHOR)", "Work at Height Regulations", "COSHH", "Electricity at Work Regulations"],
    correctIndex: 0,
    explanation: "The Manual Handling Operations Regulations 1992 (MHOR) specifically covers the safe handling of loads and requires employers to assess and reduce manual handling risks."
  },
  {
    id: 2,
    question: "Why should you keep a load close to your body when lifting?",
    options: ["Improve view of feet", "Reduce strain and leverage on the spine", "Comply with MHOR", "Use less oxygen"],
    correctIndex: 1,
    explanation: "Keeping the load close to your body reduces the leverage effect on your spine, significantly reducing the risk of back injury and muscle strain."
  },
  {
    id: 3,
    question: "Name one mechanical aid you could use for heavy electrical equipment.",
    options: ["Sack truck", "Spirit level", "Tape measure", "Voltage tester"],
    correctIndex: 0,
    explanation: "A sack truck is a wheeled lifting aid specifically designed to help move heavy items safely, reducing the physical strain on workers."
  }
];

const Module4Section7_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the main UK regulation covering manual handling?",
      options: [
        "BS 7671",
        "Health and Safety at Work Act",
        "Manual Handling Operations Regulations 1992",
        "PUWER"
      ],
      correctAnswer: 2,
      explanation: "The Manual Handling Operations Regulations 1992 (MHOR) is the specific regulation that covers manual handling safety in the workplace."
    },
    {
      id: 2,
      question: "True or False: You should always test the weight of a load before attempting to lift it.",
      options: [
        "True",
        "False",
        "Only for heavy items",
        "Only if you feel unsure"
      ],
      correctAnswer: 0,
      explanation: "True - assessing the load first, including its weight, size, and stability, is a fundamental principle of safe manual handling."
    },
    {
      id: 3,
      question: "Why should you keep your back straight when lifting?",
      options: [
        "To make it easier to bend over",
        "To reduce strain on the spine",
        "To balance the load",
        "To use less energy"
      ],
      correctAnswer: 1,
      explanation: "Keeping your back straight maintains the natural curves of your spine and prevents excessive stress on the vertebrae and supporting muscles."
    },
    {
      id: 4,
      question: "What should you do before moving a load through a building?",
      options: [
        "Run quickly to reduce effort",
        "Clear the route and plan the path",
        "Lift as high as possible",
        "Carry with arms extended"
      ],
      correctAnswer: 1,
      explanation: "Planning the route and clearing obstacles ensures safe passage and prevents trips, falls, or collisions while carrying loads."
    },
    {
      id: 5,
      question: "Which lifting aid would you use for moving a heavy cable drum?",
      options: [
        "Ladder",
        "Sack truck",
        "Rope and pulley",
        "Spirit level"
      ],
      correctAnswer: 1,
      explanation: "A sack truck (or drum jack) is specifically designed for moving heavy cylindrical objects like cable drums safely and efficiently."
    },
    {
      id: 6,
      question: "What is the recommended maximum weight an adult should lift without aid (approx.)?",
      options: [
        "10 kg",
        "15 kg",
        "25 kg",
        "50 kg"
      ],
      correctAnswer: 2,
      explanation: "While there's no absolute limit, 25 kg is generally considered the guideline for maximum weight to lift without assistance or mechanical aids."
    },
    {
      id: 7,
      question: "When carrying a long piece of trunking with a partner, what should you do before turning corners?",
      options: [
        "Drop the load",
        "Push forward quickly",
        "Communicate clearly with your partner",
        "Twist your back to adjust"
      ],
      correctAnswer: 2,
      explanation: "Clear communication with your partner is essential when manoeuvring long loads around corners to prevent accidents and coordinate movements."
    },
    {
      id: 8,
      question: "True or False: It's acceptable to twist your back while carrying if the load is light.",
      options: [
        "True",
        "False",
        "Only occasionally",
        "Only with loads under 10kg"
      ],
      correctAnswer: 1,
      explanation: "False - twisting while carrying any load can cause injury to your spine. Always turn with your feet, not your back."
    },
    {
      id: 9,
      question: "Name two PPE items that help when handling sharp-edged materials.",
      options: [
        "Hard hat and safety boots",
        "Gloves and safety glasses",
        "Hi-vis vest and ear protection",
        "Harness and helmet"
      ],
      correctAnswer: 1,
      explanation: "Gloves protect hands from cuts and sharp edges, while safety glasses protect eyes from debris or fragments when handling sharp materials."
    },
    {
      id: 10,
      question: "Give one consequence of poor manual handling for both the worker and the project.",
      options: [
        "Better efficiency and faster completion",
        "Injury and project delays",
        "Lower costs and improved quality",
        "Enhanced teamwork and communication"
      ],
      correctAnswer: 1,
      explanation: "Poor manual handling can lead to worker injury (strains, back problems) and project delays due to sick leave and potential equipment damage."
    }
  ];

  const faqs = [
    {
      question: "Can I refuse to lift something if I think it's unsafe?",
      answer: "Yes, you have the right to stop and request assistance or equipment. Safety comes before speed. Under the Health and Safety at Work Act, you have both the right and responsibility to refuse unsafe work."
    },
    {
      question: "What if there's no lifting aid available?",
      answer: "Break down the load into smaller parts, ask for help, or notify your supervisor. Never attempt to lift something that could cause injury - there are always alternatives or solutions available."
    },
    {
      question: "How heavy is too heavy to lift alone?",
      answer: "There's no fixed weight, but anything over 25 kg should normally require assistance or aids. Consider the load's size, shape, your physical condition, and the lifting environment when assessing risk."
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
              Back to Section 7
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
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 4</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 7.1</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Safe Manual Handling of Equipment and Materials
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Master safe lifting techniques and manual handling practices to prevent workplace injuries.
            </p>
          </header>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Introduction
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-white/80">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Manual handling injuries are a major cause of workplace accidents in electrical work, including back strains, muscle injuries, and dropped load accidents.</li>
                  <li>Proper lifting techniques, mechanical aids, and team lifting can prevent most manual handling injuries.</li>
                  <li>Legal requirements under MHOR 1992 place duties on both employers and employees to ensure safe handling practices.</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><strong>Spot:</strong> Heavy cable drums being carried by one person, awkward lifting positions, no lifting aids available.</li>
                  <li><strong>Use:</strong> Sack trucks, drum jacks, team lifting, proper lifting technique.</li>
                  <li><strong>Check:</strong> Load weight and size, clear routes, appropriate footwear and gloves.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Learning Outcomes
            </h2>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <ul className="list-disc pl-6 space-y-2 text-white/80">
                <li>Explain the risks associated with poor manual handling.</li>
                <li>Apply correct lifting techniques to reduce injury risk.</li>
                <li>Use handling aids and equipment where appropriate.</li>
                <li>Plan and prepare routes for moving heavy or awkward materials.</li>
                <li>Follow legal and organisational requirements for manual handling.</li>
              </ul>
            </div>
          </section>

          {/* Risks of Poor Manual Handling */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Risks of Poor Manual Handling
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Manual handling injuries represent one of the most significant safety risks in electrical work, affecting thousands of workers annually and causing substantial personal and financial costs:
              </p>

              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
                <p className="font-semibold text-red-400 mb-2">Health and Safety Consequences</p>
                <ul className="text-sm list-disc pl-6 space-y-1">
                  <li><strong>Back injuries and spinal damage</strong> - herniated discs, muscle strains, and chronic pain conditions</li>
                  <li><strong>Repetitive strain injuries (RSI)</strong> - affecting shoulders, wrists, and knees from poor handling techniques</li>
                  <li><strong>Acute injuries from dropped loads</strong> - crushing injuries to feet, cuts from sharp materials</li>
                  <li><strong>Long-term musculoskeletal disorders</strong> - affecting quality of life and career longevity</li>
                  <li><strong>Secondary accidents</strong> - falls and collisions while carrying awkward loads</li>
                  <li><strong>Fatigue-related incidents</strong> - increased accident risk from overexertion</li>
                </ul>

                <div className="mt-3 p-3 bg-black/20 rounded text-sm">
                  <p className="mb-2"><strong>HSE statistics:</strong></p>
                  <p className="text-white/70">
                    Manual handling accounts for over 40% of all workplace injuries reported under RIDDOR. In the construction industry, including electrical work, back injuries alone result in an average of 12 days lost per incident, with severe cases requiring months of recovery.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="7-1-check-1"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* The Legal Framework */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              The Legal Framework
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Manual handling safety is governed by comprehensive legislation that places specific duties on both employers and employees:
              </p>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">Legal Requirements and Responsibilities</p>
                <ul className="text-sm list-disc pl-6 space-y-1">
                  <li><strong>Manual Handling Operations Regulations 1992 (MHOR)</strong> - primary legislation covering all manual handling activities</li>
                  <li><strong>Employer duties</strong> - assess risks, provide training, supply equipment, and monitor compliance</li>
                  <li><strong>Employee responsibilities</strong> - follow safe systems, use provided equipment, report hazards</li>
                  <li><strong>Risk assessment requirements</strong> - formal evaluation of manual handling tasks and control measures</li>
                  <li><strong>Training obligations</strong> - provision of suitable instruction in safe handling techniques</li>
                  <li><strong>Equipment provision</strong> - supply of appropriate lifting aids and mechanical assistance</li>
                </ul>

                <div className="mt-3 p-3 bg-black/20 rounded text-sm">
                  <p className="mb-2"><strong>MHOR hierarchy of control:</strong></p>
                  <ul className="text-white/70 list-disc pl-4 space-y-1">
                    <li><strong>Avoid</strong> - eliminate manual handling where reasonably practicable</li>
                    <li><strong>Assess</strong> - evaluate unavoidable manual handling operations</li>
                    <li><strong>Reduce</strong> - implement measures to reduce risk of injury</li>
                    <li><strong>Review</strong> - monitor and update assessments regularly</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="7-1-check-2"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* Correct Lifting Technique */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Correct Lifting Technique
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Proper lifting technique is fundamental to preventing injury and forms the basis of all safe manual handling practices:
              </p>

              <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500/50">
                <p className="font-semibold text-green-400 mb-2">Safe Lifting Steps</p>
                <ul className="text-sm list-disc pl-6 space-y-1">
                  <li><strong>Plan the lift</strong> - assess the load, plan the route, clear obstacles, and ensure safe footing</li>
                  <li><strong>Position yourself correctly</strong> - feet shoulder-width apart, close to the load</li>
                  <li><strong>Adopt the right posture</strong> - squat down, keep back straight, head up</li>
                  <li><strong>Secure your grip</strong> - use whole hand, not fingertips, get a firm hold</li>
                  <li><strong>Lift smoothly</strong> - use leg muscles, keep load close to body, avoid jerky movements</li>
                  <li><strong>Move carefully</strong> - turn with feet not spine, avoid twisting while loaded</li>
                </ul>

                <div className="mt-3 p-3 bg-black/20 rounded text-sm">
                  <p className="mb-2"><strong>The kinetic lifting chain:</strong></p>
                  <ul className="text-white/70 list-disc pl-4 space-y-1">
                    <li><strong>Feet</strong> - provide stable base, positioned to avoid overreaching</li>
                    <li><strong>Legs</strong> - strongest muscles do the lifting work, not the back</li>
                    <li><strong>Core</strong> - abdominal muscles support spine during lift</li>
                    <li><strong>Back</strong> - maintains natural curves, acts as rigid beam</li>
                    <li><strong>Arms</strong> - keep load close, avoid extended reaches</li>
                    <li><strong>Hands</strong> - secure grip using whole palm and fingers</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="7-1-check-3"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          {/* Handling Electrical Materials */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Handling Electrical Materials
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Electrical installations involve specific materials and equipment that require specialised handling techniques:
              </p>

              <div className="p-4 rounded-lg bg-orange-500/10 border-l-2 border-orange-500/50">
                <p className="font-semibold text-orange-400 mb-2">Material-Specific Techniques</p>
                <ul className="text-sm list-disc pl-6 space-y-1">
                  <li><strong>Cable drums and reels</strong> - use drum jacks, trolleys, or mechanical lifts for weights over 25kg</li>
                  <li><strong>Conduit and trunking</strong> - carry long lengths with two people, support at multiple points</li>
                  <li><strong>Cable trays and ladders</strong> - balance load evenly, use team lifting for large sections</li>
                  <li><strong>Consumer units and distribution boards</strong> - lift from base, not from door or covers</li>
                  <li><strong>Switchgear and panels</strong> - use lifting equipment, never attempt manual lifting alone</li>
                  <li><strong>Boxes of accessories</strong> - break down into smaller loads rather than carrying full boxes</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Mechanical Aids and Assistance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Mechanical Aids and Assistance
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                The use of mechanical aids and team lifting techniques can eliminate most manual handling risks:
              </p>

              <div className="p-4 rounded-lg bg-purple-500/10 border-l-2 border-purple-500/50">
                <p className="font-semibold text-purple-400 mb-2">Equipment and Teamwork Solutions</p>
                <ul className="text-sm list-disc pl-6 space-y-1">
                  <li><strong>Wheeled aids</strong> - sack trucks, platform trolleys, pallet trucks for ground-level transport</li>
                  <li><strong>Lifting equipment</strong> - hoists, cranes, and lifting tables for heavy items</li>
                  <li><strong>Specialist tools</strong> - drum jacks, cable pulling systems, panel lifts</li>
                  <li><strong>Team lifting</strong> - coordinated lifting with clear communication protocols</li>
                  <li><strong>Vacuum lifts</strong> - for large flat panels and sheets of material</li>
                  <li><strong>Conveyor systems</strong> - for repetitive material movement tasks</li>
                </ul>

                <div className="mt-3 p-3 bg-black/20 rounded text-sm">
                  <p className="mb-2"><strong>Team lifting protocols:</strong></p>
                  <p className="text-white/70">
                    Successful team lifting requires a designated leader, clear communication signals, matching personnel by height and strength where possible, and coordinated movement with agreed signals for lift, move, and lower commands.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Practical Guidance
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-start gap-3">
                  <HardHat className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white mb-2">PPE and Protection</h4>
                    <ul className="text-sm text-white/70 space-y-1 list-disc ml-4">
                      <li>Always wear appropriate gloves when handling sharp-edged trunking, cable trays, or metalwork</li>
                      <li>Use safety glasses when moving materials overhead or in confined spaces</li>
                      <li>Ensure work boots have good grip and ankle support for load carrying</li>
                      <li>Wear high-visibility clothing when moving materials in active work areas</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white mb-2">Route Planning and Environment</h4>
                    <ul className="text-sm text-white/70 space-y-1 list-disc ml-4">
                      <li>Use rope or lifting slings to move materials up scaffolding instead of carrying them</li>
                      <li>Store heavy items at waist height to reduce bending and lifting strain</li>
                      <li>Keep work boots clean to avoid slips while carrying heavy objects</li>
                      <li>Clear routes of obstacles and debris before beginning material movement</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white mb-2">Communication and Coordination</h4>
                    <ul className="text-sm text-white/70 space-y-1 list-disc ml-4">
                      <li>When moving long conduit runs through a building, communicate clearly with your partner before turning corners</li>
                      <li>Establish clear verbal signals for team lifting operations</li>
                      <li>Designate a lead person for coordinated lifts and material movement</li>
                      <li>Brief all team members on manual handling procedures at daily toolbox talks</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Real-World Examples */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Real-World Examples
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-white mb-2">Case Study 1: The Cable Drum Incident</h3>
                    <p className="text-sm text-white/70 mb-3">
                      On a commercial site, an experienced electrician attempted to carry a full drum of 6mm² SWA cable up a staircase alone. The 45kg drum was awkward to grip and the electrician lost balance on the third step.
                    </p>
                    <p className="text-sm font-medium text-green-400">
                      <strong>Prevention:</strong> A £50 sack truck hire or team lift with a colleague would have prevented this £5,000+ incident.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500/50">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-white mb-2">Case Study 2: The Successful Team Approach</h3>
                    <p className="text-sm text-white/70 mb-3">
                      A data centre installation required moving 200+ metres of heavy cable tray through a complex route. The contractor implemented a coordinated team approach with designated roles.
                    </p>
                    <p className="text-sm font-medium text-green-400">
                      <strong>Result:</strong> Zero injuries, installation completed ahead of schedule, and client commended the professional approach.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">10</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h3 className="font-medium text-white mb-2">Q: {faq.question}</h3>
                  <p className="text-sm text-white/70"><strong>A:</strong> {faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <Book className="w-5 h-5" />
              Pocket Guide – Manual Handling Safety
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500/50">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    Assess the load and plan the lift.
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    Bend knees, keep back straight, lift with legs.
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    Keep load close, avoid twisting.
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    Use aids (trolleys, sack trucks) where possible.
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500/50">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    Ask for help if needed—never risk injury.
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    Clear routes before moving materials.
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    Wear appropriate PPE for protection.
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    Report strains and near-misses immediately.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <Target className="w-5 h-5" />
              Recap (What You've Learned)
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <ul className="list-disc pl-6 space-y-2 text-white/80">
                <li>You now understand the serious health and safety risks associated with poor manual handling practices.</li>
                <li>You know the legal requirements under MHOR 1992 and the responsibilities of employers and employees.</li>
                <li>You can apply correct lifting techniques to reduce injury risk in electrical work.</li>
                <li>You understand how to select and use appropriate mechanical aids and team lifting approaches.</li>
                <li>You've learned practical tips for handling electrical materials safely and efficiently.</li>
              </ul>
            </div>
          </section>

          {/* Quiz */}
          <Quiz questions={quizQuestions} title="Manual Handling Safety Quiz" />

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10 mt-10">
            <Button
              variant="outline"
              className="border-white/10 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Section 7
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../7-2">
                Next: Hand and Power Tools
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module4Section7_1;
