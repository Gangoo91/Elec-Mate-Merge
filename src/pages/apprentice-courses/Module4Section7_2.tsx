import { ArrowLeft, ArrowRight, FileText, Target, CheckCircle, AlertTriangle, Wrench, HardHat, Users, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Using Hand and Power Tools Safely and Legally - Module 4.7.2 | Level 2 Electrical Course";
const DESCRIPTION = "Learn safe and legal use of hand and power tools in electrical work. Master tool safety, maintenance, and legal requirements under PUWER and EAWR regulations.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "Which regulation covers the safe use of tools and equipment?",
    options: ["PUWER 1998", "Work at Height Regulations", "COSHH", "Manual Handling Operations Regulations"],
    correctIndex: 0,
    explanation: "The Provision and Use of Work Equipment Regulations 1998 (PUWER) specifically covers the safe use of tools and equipment in the workplace."
  },
  {
    id: 2,
    question: "Why should you use insulated hand tools?",
    options: ["To save money", "To prevent electric shock", "To improve grip", "To make tools last longer"],
    correctIndex: 1,
    explanation: "Insulated hand tools prevent electric shock by providing a barrier between the user and any electrical conductors, essential for electrical work safety."
  },
  {
    id: 3,
    question: "Name one PPE item essential when using a power drill.",
    options: ["Insulated gloves", "Safety goggles", "Hi-vis vest", "Steel toe boots"],
    correctIndex: 1,
    explanation: "Safety goggles protect the eyes from debris, dust, and fragments that can be generated when drilling, making them essential PPE for power drill use."
  }
];

const Module4Section7_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "Which regulation specifically covers the safe use of hand and power tools?",
      options: [
        "BS 7671",
        "PUWER 1998",
        "MHOR 1992",
        "CDM 2015"
      ],
      correctAnswer: 1,
      explanation: "The Provision and Use of Work Equipment Regulations 1998 (PUWER) specifically covers the safe provision and use of tools and equipment in the workplace."
    },
    {
      id: 2,
      question: "True or False: Only supervisors need to inspect tools before use.",
      options: [
        "True",
        "False",
        "Only for power tools",
        "Only for new tools"
      ],
      correctAnswer: 1,
      explanation: "False - every user must inspect tools before use to ensure they are safe and suitable for the task. This is a fundamental safety requirement under PUWER."
    },
    {
      id: 3,
      question: "Why should you use insulated screwdrivers and pliers?",
      options: [
        "To save money",
        "To prevent electric shock",
        "To improve grip",
        "To make tools last longer"
      ],
      correctAnswer: 1,
      explanation: "Insulated tools prevent electric shock by providing a barrier between the user and electrical conductors, essential for safe electrical work."
    },
    {
      id: 4,
      question: "Name two common hazards when using power tools.",
      options: [
        "Good lighting and ventilation",
        "Cuts and electric shock",
        "Proper storage and maintenance",
        "Training and supervision"
      ],
      correctAnswer: 1,
      explanation: "Cuts from sharp components and electric shock from faulty equipment are two major hazards associated with power tool use."
    },
    {
      id: 5,
      question: "What should you always check before drilling into a wall?",
      options: [
        "Depth of plaster",
        "Paint colour",
        "Buried cables and pipes",
        "Nail size"
      ],
      correctAnswer: 2,
      explanation: "Always check for buried cables and pipes before drilling to prevent dangerous contact with electrical or water services."
    },
    {
      id: 6,
      question: "Which electrical protection should corded tools be connected to?",
      options: [
        "MCB",
        "RCD",
        "Fuse only",
        "Isolator"
      ],
      correctAnswer: 1,
      explanation: "Corded tools should be connected to RCD (Residual Current Device) protection to provide additional safety against electric shock."
    },
    {
      id: 7,
      question: "Give one example of PPE required when grinding metal conduit.",
      options: [
        "Hi-vis vest",
        "Safety harness",
        "Face shield or safety goggles",
        "Knee pads"
      ],
      correctAnswer: 2,
      explanation: "Face shield or safety goggles are essential when grinding to protect eyes from sparks, debris, and metal particles."
    },
    {
      id: 8,
      question: "True or False: Faulty tools should be repaired on site by the user.",
      options: [
        "True",
        "False",
        "Only simple repairs",
        "Only by experienced users"
      ],
      correctAnswer: 1,
      explanation: "False - faulty tools should be tagged, removed from service, and repaired only by competent persons. User repairs can create additional hazards."
    },
    {
      id: 9,
      question: "How often should portable power tools be PAT tested (approx.)?",
      options: [
        "Weekly",
        "Monthly",
        "Every 6–12 months",
        "Every 5 years"
      ],
      correctAnswer: 2,
      explanation: "Portable power tools typically require PAT testing every 6-12 months, depending on the work environment and usage frequency."
    },
    {
      id: 10,
      question: "What three steps should you take if a tool is found unsafe?",
      options: [
        "Continue using with care",
        "Stop, tag, and report",
        "Repair and continue",
        "Share with colleagues"
      ],
      correctAnswer: 1,
      explanation: "If a tool is unsafe: Stop using it immediately, Tag it as defective, and Report it to your supervisor for proper disposal or repair."
    }
  ];

  const faqs = [
    {
      question: "Can I use my own personal tools on site?",
      answer: "Yes, but they must be in good condition and meet safety standards. Your employer may require them to be inspected and tested before use. Personal tools must comply with the same safety requirements as company-provided equipment."
    },
    {
      question: "How often should portable power tools be tested (PAT)?",
      answer: "Typically every 6–12 months, depending on site rules and usage frequency. High-risk environments may require more frequent testing, while office environments may allow longer intervals. Always follow your employer's specific requirements."
    },
    {
      question: "What should I do if a tool feels unsafe during use?",
      answer: "Stop immediately, tag it as defective, and report it to your supervisor. Never continue using a tool that feels unsafe - unusual vibration, sparking, or overheating are all warning signs that require immediate attention."
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
              <span className="text-white/60">Section 7.2</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Using Hand and Power Tools Safely and Legally
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Master safe tool operation, maintenance, and legal compliance to prevent injuries and equipment damage.
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
                  <li>Hand and power tools are essential in electrical installation but can cause serious injuries if used improperly.</li>
                  <li>Legal requirements under PUWER 1998 and EAWR 1989 mandate safe tool use, maintenance, and inspection.</li>
                  <li>Proper tool selection, correct operation, and regular maintenance prevent most tool-related accidents and equipment failures.</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><strong>Spot:</strong> Damaged tool leads, missing guards, blunt cutting edges, tools without RCD protection.</li>
                  <li><strong>Use:</strong> Insulated hand tools, RCD-protected power supplies, correct PPE for each task.</li>
                  <li><strong>Check:</strong> Tool condition before use, appropriate tool for the job, secure workpieces before drilling.</li>
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
                <li>Identify legal and regulatory requirements for tool use.</li>
                <li>Operate hand and power tools safely and effectively.</li>
                <li>Recognise common hazards associated with tool use.</li>
                <li>Apply safe practices to prevent injuries and equipment damage.</li>
                <li>Inspect and maintain tools to ensure compliance and safety.</li>
              </ul>
            </div>
          </section>

          {/* Legal and Regulatory Requirements */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Legal and Regulatory Requirements
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Tool safety in the workplace is governed by comprehensive legislation that establishes clear responsibilities for both employers and employees:
              </p>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">PUWER 1998 (Provision and Use of Work Equipment Regulations)</p>
                <ul className="text-sm list-disc pl-6 space-y-1">
                  <li><strong>Suitable equipment</strong> - tools must be appropriate for the work and environment</li>
                  <li><strong>Maintenance requirements</strong> - regular inspection and maintenance to keep tools safe</li>
                  <li><strong>Training obligations</strong> - users must be trained and competent in tool operation</li>
                  <li><strong>Information provision</strong> - adequate information about risks and safe use</li>
                  <li><strong>Inspection schedules</strong> - systematic checks to identify defects before they cause harm</li>
                  <li><strong>Dangerous parts protection</strong> - guards and safety devices must be in place and working</li>
                </ul>

                <div className="mt-3 p-3 bg-black/20 rounded text-sm">
                  <p className="mb-2"><strong>Electricity at Work Regulations 1989:</strong></p>
                  <p className="text-white/70">
                    Portable power tools must be electrically safe and regularly inspected. RCD protection is required for portable equipment used in harsh environments or where increased risk exists. Regular PAT testing ensures ongoing electrical safety.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="7-2-check-1"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* Common Hazards */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Common Hazards
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Understanding and recognising tool-related hazards is essential for preventing accidents and maintaining a safe working environment:
              </p>

              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
                <p className="font-semibold text-red-400 mb-2">Physical and Electrical Hazards</p>
                <ul className="text-sm list-disc pl-6 space-y-1">
                  <li><strong>Cuts, burns, and eye injuries</strong> - from sharp edges, hot surfaces, and flying debris</li>
                  <li><strong>Electric shock from damaged equipment</strong> - faulty cables, broken plugs, or compromised insulation</li>
                  <li><strong>Trips from trailing extension leads</strong> - poor cable management and inadequate routing</li>
                  <li><strong>Noise and vibration risks</strong> - hearing damage and hand-arm vibration syndrome (HAVS)</li>
                  <li><strong>Struck by moving parts</strong> - unguarded cutting blades, rotating chucks, and reciprocating components</li>
                  <li><strong>Respiratory hazards</strong> - dust, fumes, and particles from cutting and grinding operations</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="7-2-check-2"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* Hand Tools */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Hand Tools
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Hand tools form the foundation of electrical work, requiring proper selection, maintenance, and technique for safe and effective operation:
              </p>

              <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500/50">
                <p className="font-semibold text-green-400 mb-2">Safe Hand Tool Practices</p>
                <ul className="text-sm list-disc pl-6 space-y-1">
                  <li><strong>Screwdrivers</strong> - use correct size and type to avoid slipping, ensure insulated handles for electrical work</li>
                  <li><strong>Pliers and cutters</strong> - maintain sharp cutting edges, use insulated versions near live conductors</li>
                  <li><strong>Hammers</strong> - check handles and heads are secure, use appropriate weight for the task</li>
                  <li><strong>Spanners and wrenches</strong> - select correct size to prevent slipping and damage to fasteners</li>
                  <li><strong>Files and saws</strong> - keep cutting surfaces clean and sharp, secure workpieces properly</li>
                  <li><strong>Measuring tools</strong> - handle carefully to maintain accuracy, store in protective cases</li>
                </ul>

                <div className="mt-3 p-3 bg-black/20 rounded text-sm">
                  <p className="mb-2"><strong>Insulated hand tools:</strong></p>
                  <p className="text-white/70">
                    BS EN 60900 specifies requirements for insulated hand tools rated up to 1000V AC or 1500V DC. These tools provide essential protection when working near live conductors and should be inspected regularly for damage to the insulation.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="7-2-check-3"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          {/* Power Tools */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Power Tools
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Power tools increase productivity but require additional safety measures due to their electrical and mechanical hazards:
              </p>

              <div className="p-4 rounded-lg bg-amber-500/10 border-l-2 border-amber-500/50">
                <p className="font-semibold text-amber-400 mb-2">Power Tool Safety Requirements</p>
                <ul className="text-sm list-disc pl-6 space-y-1">
                  <li><strong>Pre-use inspection</strong> - check plugs, leads, and guards before each use</li>
                  <li><strong>RCD protection</strong> - all portable power tools must be RCD-protected (30mA trip)</li>
                  <li><strong>Appropriate PPE</strong> - safety glasses, gloves, ear defenders as required by task</li>
                  <li><strong>Workpiece security</strong> - clamp or secure items before cutting, drilling, or grinding</li>
                  <li><strong>Correct technique</strong> - maintain firm grip, stable stance, and controlled operation</li>
                  <li><strong>Environmental awareness</strong> - check for hidden services, adequate lighting, and stable surfaces</li>
                </ul>

                <div className="mt-3 p-3 bg-black/20 rounded text-sm">
                  <p className="mb-2"><strong>Battery tool considerations:</strong></p>
                  <p className="text-white/70">
                    Cordless tools eliminate trailing lead hazards but require attention to battery condition, charging safety, and power management. Store batteries in dry conditions and never attempt to repair damaged battery packs.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Maintenance and Storage */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Maintenance and Storage
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Proper maintenance and storage are essential for tool safety, longevity, and legal compliance:
              </p>

              <div className="p-4 rounded-lg bg-purple-500/10 border-l-2 border-purple-500/50">
                <p className="font-semibold text-purple-400 mb-2">Tool Maintenance and Storage Systems</p>
                <ul className="text-sm list-disc pl-6 space-y-1">
                  <li><strong>Daily inspection</strong> - check tools before and after each use for defects</li>
                  <li><strong>Immediate removal</strong> - tag and remove faulty tools from service immediately</li>
                  <li><strong>Cleaning procedures</strong> - keep tools clean and free from debris and contaminants</li>
                  <li><strong>Proper storage</strong> - store in correct cases, racks, or designated areas</li>
                  <li><strong>Environmental protection</strong> - keep tools dry and protected from damage</li>
                  <li><strong>Regular maintenance</strong> - follow manufacturer schedules for servicing and calibration</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <Wrench className="w-5 h-5" />
              Practical Guidance (On-Site Tips)
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-2">Pre-Work Safety Checks</h3>
                <ul className="text-sm text-white/70 space-y-1 list-disc ml-5">
                  <li>Always check for buried cables/pipes before drilling into walls using a cable detector</li>
                  <li>Verify RCD protection is working before connecting power tools</li>
                  <li>Ensure adequate lighting and ventilation in work areas</li>
                  <li>Keep first aid kit and emergency contacts readily available</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-2">Tool Management Best Practices</h3>
                <ul className="text-sm text-white/70 space-y-1 list-disc ml-5">
                  <li>Keep battery chargers and cordless tools dry and off the floor</li>
                  <li>Use corded tools with RCD protection at all times</li>
                  <li>Carry only the tools you need when working at height</li>
                  <li>Mark personal tools with your name to prevent mix-ups on site</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Real-World Examples */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <Users className="w-5 h-5" />
              Real-World Examples
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-white mb-2">Case Study 1: Improper Tool Use</h3>
                    <p className="text-sm text-white/70 mb-2">
                      On a housing development, an apprentice used a blunt screwdriver on a consumer unit, causing the tool to slip and cut his hand badly. The wrong-sized tool created excessive force requirements and loss of control.
                    </p>
                    <p className="text-sm text-white/70 bg-black/20 p-2 rounded">
                      <strong>Prevention:</strong> Using the correct size insulated screwdriver would have prevented slipping and provided electrical protection.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500/50">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-white mb-2">Case Study 3: Good Practice Example</h3>
                    <p className="text-sm text-white/70 mb-2">
                      An experienced electrician discovered a faulty angle grinder during pre-use inspection. The tool was immediately tagged and removed from service, preventing potential injury to other workers.
                    </p>
                    <p className="text-sm text-white/70 bg-black/20 p-2 rounded">
                      <strong>Good Practice:</strong> Regular inspection, immediate action on defects, and clear communication protected the entire team.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <HardHat className="w-5 h-5" />
              Frequently Asked Questions
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
              <Book className="w-5 h-5" />
              Pocket Guide (Key Takeaways)
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                    <span className="font-medium text-white">PUWER requires safe and suitable tool use</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                    <span className="font-medium text-white">Inspect all tools before use</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                    <span className="font-medium text-white">Use insulated hand tools for electrical work</span>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                    <span className="font-medium text-white">Always wear PPE for cutting, drilling, or grinding</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                    <span className="font-medium text-white">Faulty tools = tag, remove, report</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                    <span className="font-medium text-white">RCD protection for all portable power tools</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <Target className="w-5 h-5" />
              Recap
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-white/80 mb-4">In this subsection, you learned:</p>
              <ul className="list-disc pl-6 space-y-2 text-white/80">
                <li>The legal requirements for tool safety under PUWER and EAWR.</li>
                <li>Hazards linked to tool use and how to avoid them.</li>
                <li>Best practice for both hand and power tool use.</li>
                <li>The importance of tool inspection, maintenance, and storage.</li>
                <li>Practical, on-site habits that improve safety and efficiency.</li>
              </ul>
            </div>
          </section>

          {/* Quiz */}
          <Quiz questions={quizQuestions} title="Hand and Power Tools Safety Quiz" />

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10 mt-10">
            <Button
              variant="outline"
              className="border-white/10 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../7-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back: Manual Handling
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../7-3">
                Next: PPE for Cutting, Bending, and Fixing
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module4Section7_2;
