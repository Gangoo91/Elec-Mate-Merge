import { ArrowLeft, ArrowRight, Shield, Target, CheckCircle, AlertTriangle, ClipboardList, Wrench, HardHat, Users, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
    <div className="min-h-screen bg-[#121212]">
      {/* Top header bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 7
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
              Section 4.7.1
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Safe Manual Handling of Equipment and Materials
          </h1>
          <p className="text-white">
            Master safe lifting techniques and manual handling practices to prevent workplace injuries.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Manual handling injuries are a major cause of workplace accidents in electrical work, including back strains, muscle injuries, and dropped load accidents.</li>
                <li>Proper lifting techniques, mechanical aids, and team lifting can prevent most manual handling injuries.</li>
                <li>Legal requirements under MHOR 1992 place duties on both employers and employees to ensure safe handling practices.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Heavy cable drums being carried by one person, awkward lifting positions, no lifting aids available.</li>
                <li><strong>Use:</strong> Sack trucks, drum jacks, team lifting, proper lifting technique.</li>
                <li><strong>Check:</strong> Load weight and size, clear routes, appropriate footwear and gloves.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>Explain the risks associated with poor manual handling.</li>
            <li>Apply correct lifting techniques to reduce injury risk.</li>
            <li>Use handling aids and equipment where appropriate.</li>
            <li>Plan and prepare routes for moving heavy or awkward materials.</li>
            <li>Follow legal and organisational requirements for manual handling.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content</h2>

          {/* Risks of Poor Manual Handling */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">1. Risks of Poor Manual Handling</h3>
            <p className="text-base text-white mb-4">
              Manual handling injuries represent one of the most significant safety risks in electrical work, affecting thousands of workers annually and causing substantial personal and financial costs:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-elec-yellow mb-1">Health and Safety Consequences</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Back injuries and spinal damage</strong> - herniated discs, muscle strains, and chronic pain conditions</li>
                      <li><strong>Repetitive strain injuries (RSI)</strong> - affecting shoulders, wrists, and knees from poor handling techniques</li>
                      <li><strong>Acute injuries from dropped loads</strong> - crushing injuries to feet, cuts from sharp materials</li>
                      <li><strong>Long-term musculoskeletal disorders</strong> - affecting quality of life and career longevity</li>
                      <li><strong>Secondary accidents</strong> - falls and collisions while carrying awkward loads</li>
                      <li><strong>Fatigue-related incidents</strong> - increased accident risk from overexertion</li>
                    </ul>
                    
                    <div className="mt-3 p-3 bg-[#121212]/50 rounded border">
                      <p className="text-xs sm:text-sm text-white mb-2"><strong>HSE statistics:</strong></p>
                      <p className="text-xs text-white">
                        Manual handling accounts for over 40% of all workplace injuries reported under RIDDOR. In the construction industry, including electrical work, back injuries alone result in an average of 12 days lost per incident, with severe cases requiring months of recovery.
                      </p>
                    </div>
                    
                    <div className="mt-3 p-3 bg-[#121212]/50 rounded border">
                      <p className="text-xs sm:text-sm text-white mb-2"><strong>Project impact:</strong></p>
                      <p className="text-xs text-white">
                        Manual handling injuries don't just affect the individual worker. Project delays, replacement worker costs, potential HSE investigations, and increased insurance premiums can cost contractors thousands of pounds per incident.
                      </p>
                    </div>
                  </div>
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
          <Separator className="my-6" />

          {/* The Legal Framework */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">2. The Legal Framework</h3>
            <p className="text-base text-white mb-4">
              Manual handling safety is governed by comprehensive legislation that places specific duties on both employers and employees:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-1">Legal Requirements and Responsibilities</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Manual Handling Operations Regulations 1992 (MHOR)</strong> - primary legislation covering all manual handling activities</li>
                      <li><strong>Employer duties</strong> - assess risks, provide training, supply equipment, and monitor compliance</li>
                      <li><strong>Employee responsibilities</strong> - follow safe systems, use provided equipment, report hazards</li>
                      <li><strong>Risk assessment requirements</strong> - formal evaluation of manual handling tasks and control measures</li>
                      <li><strong>Training obligations</strong> - provision of suitable instruction in safe handling techniques</li>
                      <li><strong>Equipment provision</strong> - supply of appropriate lifting aids and mechanical assistance</li>
                    </ul>
                    
                    <div className="mt-3 p-3 bg-[#121212]/50 rounded border">
                      <p className="text-xs sm:text-sm text-white mb-2"><strong>MHOR hierarchy of control:</strong></p>
                      <ul className="text-xs text-white list-disc ml-4 space-y-1">
                        <li><strong>Avoid</strong> - eliminate manual handling where reasonably practicable</li>
                        <li><strong>Assess</strong> - evaluate unavoidable manual handling operations</li>
                        <li><strong>Reduce</strong> - implement measures to reduce risk of injury</li>
                        <li><strong>Review</strong> - monitor and update assessments regularly</li>
                      </ul>
                    </div>
                    
                    <div className="mt-3 p-3 bg-amber-50/50 dark:bg-amber-900/10 rounded border border-amber-200/30">
                      <p className="text-xs sm:text-sm text-white mb-2"><strong>Legal consequences of non-compliance:</strong></p>
                      <p className="text-xs text-white">
                        Failure to comply with MHOR can result in HSE enforcement action, unlimited fines for corporate offences, and potential imprisonment for individuals. Additionally, inadequate manual handling procedures can void insurance coverage and result in successful personal injury claims.
                      </p>
                    </div>
                  </div>
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
          <Separator className="my-6" />

          {/* Correct Lifting Technique */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">3. Correct Lifting Technique</h3>
            <p className="text-base text-white mb-4">
              Proper lifting technique is fundamental to preventing injury and forms the basis of all safe manual handling practices:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Safe Lifting Steps</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Plan the lift</strong> - assess the load, plan the route, clear obstacles, and ensure safe footing</li>
                      <li><strong>Position yourself correctly</strong> - feet shoulder-width apart, close to the load</li>
                      <li><strong>Adopt the right posture</strong> - squat down, keep back straight, head up</li>
                      <li><strong>Secure your grip</strong> - use whole hand, not fingertips, get a firm hold</li>
                      <li><strong>Lift smoothly</strong> - use leg muscles, keep load close to body, avoid jerky movements</li>
                      <li><strong>Move carefully</strong> - turn with feet not spine, avoid twisting while loaded</li>
                    </ul>
                    
                    <div className="mt-3 p-3 bg-[#121212]/50 rounded border">
                      <p className="text-xs sm:text-sm text-white mb-2"><strong>The kinetic lifting chain:</strong></p>
                      <ul className="text-xs text-white list-disc ml-4 space-y-1">
                        <li><strong>Feet</strong> - provide stable base, positioned to avoid overreaching</li>
                        <li><strong>Legs</strong> - strongest muscles do the lifting work, not the back</li>
                        <li><strong>Core</strong> - abdominal muscles support spine during lift</li>
                        <li><strong>Back</strong> - maintains natural curves, acts as rigid beam</li>
                        <li><strong>Arms</strong> - keep load close, avoid extended reaches</li>
                        <li><strong>Hands</strong> - secure grip using whole palm and fingers</li>
                      </ul>
                    </div>
                    
                    <div className="mt-3 p-3 bg-red-50/50 dark:bg-red-900/10 rounded border border-red-200/30">
                      <p className="text-xs sm:text-sm text-white mb-2"><strong>Common lifting errors to avoid:</strong></p>
                      <ul className="text-xs text-white list-disc ml-4 space-y-1">
                        <li>Bending from the waist instead of squatting</li>
                        <li>Lifting while twisting the spine</li>
                        <li>Attempting to lift loads that are too heavy</li>
                        <li>Rushing the lift or using jerky movements</li>
                        <li>Lifting with extended arms away from the body</li>
                        <li>Ignoring warning signs of strain or fatigue</li>
                      </ul>
                    </div>
                  </div>
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
          <Separator className="my-6" />

          {/* Handling Electrical Materials */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">4. Handling Electrical Materials</h3>
            <p className="text-base text-white mb-4">
              Electrical installations involve specific materials and equipment that require specialised handling techniques:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-elec-yellow mb-1">Material-Specific Techniques</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Cable drums and reels</strong> - use drum jacks, trolleys, or mechanical lifts for weights over 25kg</li>
                      <li><strong>Conduit and trunking</strong> - carry long lengths with two people, support at multiple points</li>
                      <li><strong>Cable trays and ladders</strong> - balance load evenly, use team lifting for large sections</li>
                      <li><strong>Consumer units and distribution boards</strong> - lift from base, not from door or covers</li>
                      <li><strong>Switchgear and panels</strong> - use lifting equipment, never attempt manual lifting alone</li>
                      <li><strong>Boxes of accessories</strong> - break down into smaller loads rather than carrying full boxes</li>
                    </ul>
                    
                    <div className="mt-3 p-3 bg-[#121212]/50 rounded border">
                      <p className="text-xs sm:text-sm text-white mb-2"><strong>Cable handling considerations:</strong></p>
                      <ul className="text-xs text-white list-disc ml-4 space-y-1">
                        <li><strong>SWA cable drums</strong> - can weigh 100kg+, always use mechanical aids</li>
                        <li><strong>Fibre optic cables</strong> - sensitive to bending radius, support carefully</li>
                        <li><strong>High voltage cables</strong> - special handling procedures, trained personnel only</li>
                        <li><strong>Coiled cables</strong> - uncoil properly to avoid kinking and damage</li>
                      </ul>
                    </div>
                    
                    <div className="mt-3 p-3 bg-emerald-50/50 dark:bg-blue-900/10 rounded border border-blue-200/30">
                      <p className="text-xs sm:text-sm text-white mb-2"><strong>Environmental considerations:</strong></p>
                      <p className="text-xs text-white">
                        Weather conditions significantly affect manual handling safety. Wet surfaces increase slip risk, cold weather reduces grip strength and flexibility, while hot conditions increase fatigue. Always adjust handling techniques and use appropriate PPE for conditions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mechanical Aids and Assistance */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">5. Mechanical Aids and Assistance</h3>
            <p className="text-base text-white mb-4">
              The use of mechanical aids and team lifting techniques can eliminate most manual handling risks:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-elec-yellow mb-1">Equipment and Teamwork Solutions</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Wheeled aids</strong> - sack trucks, platform trolleys, pallet trucks for ground-level transport</li>
                      <li><strong>Lifting equipment</strong> - hoists, cranes, and lifting tables for heavy items</li>
                      <li><strong>Specialist tools</strong> - drum jacks, cable pulling systems, panel lifts</li>
                      <li><strong>Team lifting</strong> - coordinated lifting with clear communication protocols</li>
                      <li><strong>Vacuum lifts</strong> - for large flat panels and sheets of material</li>
                      <li><strong>Conveyor systems</strong> - for repetitive material movement tasks</li>
                    </ul>
                    
                    <div className="mt-3 p-3 bg-[#121212]/50 rounded border">
                      <p className="text-xs sm:text-sm text-white mb-2"><strong>Selecting the right aid:</strong></p>
                      <ul className="text-xs text-white list-disc ml-4 space-y-1">
                        <li><strong>Load characteristics</strong> - weight, size, shape, and fragility</li>
                        <li><strong>Route conditions</strong> - stairs, narrow passages, surface quality</li>
                        <li><strong>Frequency of use</strong> - one-off lifts vs repeated operations</li>
                        <li><strong>Available personnel</strong> - trained operators and assistance</li>
                        <li><strong>Cost considerations</strong> - hire vs purchase for occasional use</li>
                      </ul>
                    </div>
                    
                    <div className="mt-3 p-3 bg-green-50/50 dark:bg-green-900/10 rounded border border-green-200/30">
                      <p className="text-xs sm:text-sm text-white mb-2"><strong>Team lifting protocols:</strong></p>
                      <p className="text-xs text-white">
                        Successful team lifting requires a designated leader, clear communication signals, matching personnel by height and strength where possible, and coordinated movement with agreed signals for lift, move, and lower commands.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        <Separator className="my-8" />

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Practical Guidance</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-white mb-4">On-Site Manual Handling Best Practices</h3>
              <p className="text-base text-white mb-4">
                Implementing effective manual handling practices requires attention to detail and consistent application of safety principles:
              </p>
              
              <div className="space-y-4">
                <div className="rounded-lg p-4 bg-emerald-50/50 dark:bg-blue-900/10 border border-blue-200/30">
                  <div className="flex items-start gap-3">
                    <HardHat className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-white mb-2">PPE and Protection</h4>
                      <ul className="text-xs sm:text-sm text-white space-y-1 list-disc ml-4">
                        <li>Always wear appropriate gloves when handling sharp-edged trunking, cable trays, or metalwork</li>
                        <li>Use safety glasses when moving materials overhead or in confined spaces</li>
                        <li>Ensure work boots have good grip and ankle support for load carrying</li>
                        <li>Wear high-visibility clothing when moving materials in active work areas</li>
                        <li>Consider back support belts for workers with previous injury history</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg p-4 bg-green-50/50 dark:bg-green-900/10 border border-green-200/30">
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-white mb-2">Route Planning and Environment</h4>
                      <ul className="text-xs sm:text-sm text-white space-y-1 list-disc ml-4">
                        <li>Use rope or lifting slings to move materials up scaffolding instead of carrying them</li>
                        <li>Store heavy items at waist height to reduce bending and lifting strain</li>
                        <li>Keep work boots clean to avoid slips while carrying heavy objects</li>
                        <li>Clear routes of obstacles and debris before beginning material movement</li>
                        <li>Ensure adequate lighting along material handling routes</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg p-4 bg-purple-50/50 dark:bg-purple-900/10 border border-purple-200/30">
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-white mb-2">Communication and Coordination</h4>
                      <ul className="text-xs sm:text-sm text-white space-y-1 list-disc ml-4">
                        <li>When moving long conduit runs through a building, communicate clearly with your partner before turning corners</li>
                        <li>Establish clear verbal signals for team lifting operations</li>
                        <li>Designate a lead person for coordinated lifts and material movement</li>
                        <li>Use radio communication for long-distance material coordination</li>
                        <li>Brief all team members on manual handling procedures at daily toolbox talks</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg p-4 bg-amber-50/50 dark:bg-amber-900/10 border border-amber-200/30">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-white mb-2">Risk Assessment and Monitoring</h4>
                      <ul className="text-xs sm:text-sm text-white space-y-1 list-disc ml-4">
                        <li>Conduct task-specific risk assessments for unusual or heavy lifting operations</li>
                        <li>Monitor workers for signs of fatigue or strain throughout the day</li>
                        <li>Rotate personnel on physically demanding tasks to prevent overexertion</li>
                        <li>Report near-misses and minor strains to prevent serious injuries</li>
                        <li>Review and update manual handling procedures based on incident feedback</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg p-4 bg-red-50/50 dark:bg-red-900/10 border border-red-200/30">
                  <div className="flex items-start gap-3">
                    <Wrench className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-white mb-2">Equipment Maintenance and Selection</h4>
                      <ul className="text-xs sm:text-sm text-white space-y-1 list-disc ml-4">
                        <li>Regularly inspect manual handling aids for damage or wear</li>
                        <li>Ensure lifting equipment is within certification dates</li>
                        <li>Provide training on correct use of all manual handling equipment</li>
                        <li>Select equipment appropriate to the specific task and environment</li>
                        <li>Maintain equipment inventory appropriate to typical project requirements</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Real-World Examples */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Real-World Examples</h2>
          <div className="space-y-4">
            <div className="rounded-lg p-4 bg-red-50/50 dark:bg-red-900/10 border border-red-200/30">
              <h3 className="font-medium text-white mb-2">Case Study 1: The Cable Drum Incident</h3>
              <p className="text-base text-white mb-3">
                On a commercial site, an experienced electrician attempted to carry a full drum of 6mm² SWA cable up a staircase alone. The 45kg drum was awkward to grip and the electrician lost balance on the third step.
              </p>
              <p className="text-xs sm:text-sm text-white mb-3">
                <strong>The consequences:</strong>
              </p>
              <ul className="text-xs text-white list-disc ml-6 space-y-1">
                <li>Twisted back requiring 10 days off work</li>
                <li>Damaged cable drum costing £300 to replace</li>
                <li>Project delay of 2 days while replacement worker was found</li>
                <li>HSE investigation and potential enforcement action</li>
                <li>Increased insurance premiums for the following year</li>
              </ul>
              <p className="text-sm font-medium text-green-700 dark:text-green-400 mt-3">
                <strong>Prevention:</strong> A £50 sack truck hire or team lift with a colleague would have prevented this £5,000+ incident.
              </p>
            </div>
            
            <div className="rounded-lg p-4 bg-emerald-50/50 dark:bg-blue-900/10 border border-blue-200/30">
              <h3 className="font-medium text-white mb-2">Case Study 2: The Successful Team Approach</h3>
              <p className="text-base text-white mb-3">
                A data centre installation required moving 200+ metres of heavy cable tray through a complex route. The contractor implemented a coordinated team approach with designated roles.
              </p>
              <p className="text-xs sm:text-sm text-white mb-3">
                <strong>The approach:</strong>
              </p>
              <ul className="text-xs text-white list-disc ml-6 space-y-1">
                <li>Pre-planned route with obstacle removal</li>
                <li>Teams of 4 people per 3-metre tray section</li>
                <li>Radio communication between teams</li>
                <li>Scheduled rest breaks every 30 minutes</li>
                <li>Mechanical aids for vertical lifts</li>
              </ul>
              <p className="text-sm font-medium text-green-700 dark:text-green-400 mt-3">
                <strong>Result:</strong> Zero injuries, installation completed ahead of schedule, and client commended the professional approach.
              </p>
            </div>
            
            <div className="rounded-lg p-4 bg-green-50/50 dark:bg-green-900/10 border border-green-200/30">
              <h3 className="font-medium text-white mb-2">Case Study 3: The Mechanical Aid Investment</h3>
              <p className="text-base text-white mb-3">
                A small electrical contractor invested £2,000 in a powered stair-climbing trolley after several back strain incidents. The equipment was used on a hospital refurbishment project requiring movement of heavy distribution boards.
              </p>
              <p className="text-xs sm:text-sm text-white mb-3">
                <strong>The benefits:</strong>
              </p>
              <ul className="text-xs text-white list-disc ml-6 space-y-1">
                <li>Eliminated manual lifting of 50kg+ distribution boards</li>
                <li>Reduced labour time by 40% on material handling</li>
                <li>Zero manual handling injuries on the project</li>
                <li>Won additional contracts due to safety reputation</li>
                <li>Equipment paid for itself within 6 months</li>
              </ul>
            </div>
            
            <div className="rounded-lg p-4 bg-purple-50/50 dark:bg-purple-900/10 border border-purple-200/30">
              <h3 className="font-medium text-white mb-2">Case Study 4: The Training Success</h3>
              <p className="text-base text-white mb-3">
                Following a series of minor manual handling incidents, a medium-sized electrical contractor implemented comprehensive manual handling training for all operatives.
              </p>
              <p className="text-xs sm:text-sm text-white mb-3">
                <strong>The programme included:</strong>
              </p>
              <ul className="text-xs text-white list-disc ml-6 space-y-1">
                <li>Hands-on lifting technique training</li>
                <li>Equipment familiarisation sessions</li>
                <li>Risk assessment training</li>
                <li>Regular refresher courses</li>
                <li>Peer monitoring and feedback systems</li>
              </ul>
              <p className="text-sm font-medium text-green-700 dark:text-green-400 mt-3">
                <strong>Results:</strong> 75% reduction in manual handling incidents over 12 months and improved worker satisfaction scores.
              </p>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
                <h3 className="font-medium text-white mb-2">Q: {faq.question}</h3>
                <p className="text-xs sm:text-sm text-white"><strong>A:</strong> {faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Book className="w-5 h-5" />
            Pocket Guide – Manual Handling Safety
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-lg p-4 bg-green-50/50 dark:bg-green-900/10 border border-green-200/30">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-300">
                  <CheckCircle className="w-4 h-4" />
                  Assess the load and plan the lift.
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-300">
                  <CheckCircle className="w-4 h-4" />
                  Bend knees, keep back straight, lift with legs.
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-300">
                  <CheckCircle className="w-4 h-4" />
                  Keep load close, avoid twisting.
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-300">
                  <CheckCircle className="w-4 h-4" />
                  Use aids (trolleys, sack trucks) where possible.
                </div>
              </div>
            </div>
            <div className="rounded-lg p-4 bg-green-50/50 dark:bg-green-900/10 border border-green-200/30">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-300">
                  <CheckCircle className="w-4 h-4" />
                  Ask for help if needed—never risk injury.
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-300">
                  <CheckCircle className="w-4 h-4" />
                  Clear routes before moving materials.
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-300">
                  <CheckCircle className="w-4 h-4" />
                  Wear appropriate PPE for protection.
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-300">
                  <CheckCircle className="w-4 h-4" />
                  Report strains and near-misses immediately.
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            Recap (What You've Learned)
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>You now understand the serious health and safety risks associated with poor manual handling practices.</li>
            <li>You know the legal requirements under MHOR 1992 and the responsibilities of employers and employees.</li>
            <li>You can apply correct lifting techniques to reduce injury risk in electrical work.</li>
            <li>You understand how to select and use appropriate mechanical aids and team lifting approaches.</li>
            <li>You've learned practical tips for handling electrical materials safely and efficiently.</li>
          </ul>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} title="Manual Handling Safety Quiz" />

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
          <Button variant="outline" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button asChild>
            <Link to="../7-2">
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module4Section7_1;