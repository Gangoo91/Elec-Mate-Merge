import { ArrowLeft, ArrowRight, FileText, Target, CheckCircle, AlertTriangle, ClipboardList, Wrench, HardHat, Users, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
              <FileText className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 4.7.2
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Using Hand and Power Tools Safely and Legally
          </h1>
          <p className="text-white">
            Master safe tool operation, maintenance, and legal compliance to prevent injuries and equipment damage.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Hand and power tools are essential in electrical installation but can cause serious injuries if used improperly.</li>
                <li>Legal requirements under PUWER 1998 and EAWR 1989 mandate safe tool use, maintenance, and inspection.</li>
                <li>Proper tool selection, correct operation, and regular maintenance prevent most tool-related accidents and equipment failures.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Damaged tool leads, missing guards, blunt cutting edges, tools without RCD protection.</li>
                <li><strong>Use:</strong> Insulated hand tools, RCD-protected power supplies, correct PPE for each task.</li>
                <li><strong>Check:</strong> Tool condition before use, appropriate tool for the job, secure workpieces before drilling.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>Identify legal and regulatory requirements for tool use.</li>
            <li>Operate hand and power tools safely and effectively.</li>
            <li>Recognise common hazards associated with tool use.</li>
            <li>Apply safe practices to prevent injuries and equipment damage.</li>
            <li>Inspect and maintain tools to ensure compliance and safety.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content</h2>

          {/* Legal and Regulatory Requirements */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">1. Legal and Regulatory Requirements</h3>
            <p className="text-base text-white mb-4">
              Tool safety in the workplace is governed by comprehensive legislation that establishes clear responsibilities for both employers and employees:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-1">PUWER 1998 (Provision and Use of Work Equipment Regulations)</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Suitable equipment</strong> - tools must be appropriate for the work and environment</li>
                      <li><strong>Maintenance requirements</strong> - regular inspection and maintenance to keep tools safe</li>
                      <li><strong>Training obligations</strong> - users must be trained and competent in tool operation</li>
                      <li><strong>Information provision</strong> - adequate information about risks and safe use</li>
                      <li><strong>Inspection schedules</strong> - systematic checks to identify defects before they cause harm</li>
                      <li><strong>Dangerous parts protection</strong> - guards and safety devices must be in place and working</li>
                    </ul>
                    
                    <div className="mt-3 p-3 bg-[#121212]/50 rounded border">
                      <p className="text-xs sm:text-sm text-white mb-2"><strong>Electricity at Work Regulations 1989:</strong></p>
                      <p className="text-xs text-white">
                        Portable power tools must be electrically safe and regularly inspected. RCD protection is required for portable equipment used in harsh environments or where increased risk exists. Regular PAT testing ensures ongoing electrical safety.
                      </p>
                    </div>
                    
                    <div className="mt-3 p-3 bg-[#121212]/50 rounded border">
                      <p className="text-xs sm:text-sm text-white mb-2"><strong>Manufacturer instructions:</strong></p>
                      <p className="text-xs text-white">
                        Following manufacturer instructions is a legal requirement. This includes operating procedures, maintenance schedules, PPE requirements, and safety precautions. Deviating from manufacturer guidance can void warranties and create liability issues.
                      </p>
                    </div>
                  </div>
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
          <Separator className="my-6" />

          {/* Common Hazards */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">2. Common Hazards</h3>
            <p className="text-base text-white mb-4">
              Understanding and recognising tool-related hazards is essential for preventing accidents and maintaining a safe working environment:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-elec-yellow mb-1">Physical and Electrical Hazards</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Cuts, burns, and eye injuries</strong> - from sharp edges, hot surfaces, and flying debris</li>
                      <li><strong>Electric shock from damaged equipment</strong> - faulty cables, broken plugs, or compromised insulation</li>
                      <li><strong>Trips from trailing extension leads</strong> - poor cable management and inadequate routing</li>
                      <li><strong>Noise and vibration risks</strong> - hearing damage and hand-arm vibration syndrome (HAVS)</li>
                      <li><strong>Struck by moving parts</strong> - unguarded cutting blades, rotating chucks, and reciprocating components</li>
                      <li><strong>Respiratory hazards</strong> - dust, fumes, and particles from cutting and grinding operations</li>
                    </ul>
                    
                    <div className="mt-3 p-3 bg-[#121212]/50 rounded border">
                      <p className="text-xs sm:text-sm text-white mb-2"><strong>Environmental factors:</strong></p>
                      <p className="text-xs text-white">
                        Weather conditions, lighting, and workspace layout all affect tool safety. Wet conditions increase electric shock risk, poor lighting leads to accidents, and cramped spaces prevent proper tool control and emergency responses.
                      </p>
                    </div>
                    
                    <div className="mt-3 p-3 bg-[#121212]/50 rounded border">
                      <p className="text-xs sm:text-sm text-white mb-2"><strong>Human factors:</strong></p>
                      <p className="text-xs text-white">
                        Fatigue, rushing, inadequate training, and complacency contribute significantly to tool-related accidents. Proper work planning, regular breaks, and maintaining concentration are essential for safe tool operation.
                      </p>
                    </div>
                  </div>
                </div>
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
          <Separator className="my-6" />

          {/* Hand Tools */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">3. Hand Tools</h3>
            <p className="text-base text-white mb-4">
              Hand tools form the foundation of electrical work, requiring proper selection, maintenance, and technique for safe and effective operation:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Safe Hand Tool Practices</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Screwdrivers</strong> - use correct size and type to avoid slipping, ensure insulated handles for electrical work</li>
                      <li><strong>Pliers and cutters</strong> - maintain sharp cutting edges, use insulated versions near live conductors</li>
                      <li><strong>Hammers</strong> - check handles and heads are secure, use appropriate weight for the task</li>
                      <li><strong>Spanners and wrenches</strong> - select correct size to prevent slipping and damage to fasteners</li>
                      <li><strong>Files and saws</strong> - keep cutting surfaces clean and sharp, secure workpieces properly</li>
                      <li><strong>Measuring tools</strong> - handle carefully to maintain accuracy, store in protective cases</li>
                    </ul>
                    
                    <div className="mt-3 p-3 bg-[#121212]/50 rounded border">
                      <p className="text-xs sm:text-sm text-white mb-2"><strong>Insulated hand tools:</strong></p>
                      <p className="text-xs text-white">
                        BS EN 60900 specifies requirements for insulated hand tools rated up to 1000V AC or 1500V DC. These tools provide essential protection when working near live conductors and should be inspected regularly for damage to the insulation.
                      </p>
                    </div>
                    
                    <div className="mt-3 p-3 bg-[#121212]/50 rounded border">
                      <p className="text-xs sm:text-sm text-white mb-2"><strong>Tool condition checklist:</strong></p>
                      <ul className="text-xs text-white list-disc ml-4 space-y-1">
                        <li>Handles secure and free from cracks or splits</li>
                        <li>Cutting edges sharp and properly aligned</li>
                        <li>No bent or damaged components</li>
                        <li>Insulation intact on electrical tools</li>
                        <li>Moving parts operate smoothly</li>
                        <li>Appropriate for the intended task</li>
                      </ul>
                    </div>
                  </div>
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
          <Separator className="my-6" />

          {/* Power Tools */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">4. Power Tools</h3>
            <p className="text-base text-white mb-4">
              Power tools increase productivity but require additional safety measures due to their electrical and mechanical hazards:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-amber-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-amber-600 dark:text-amber-400 mb-1">Power Tool Safety Requirements</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Pre-use inspection</strong> - check plugs, leads, and guards before each use</li>
                      <li><strong>RCD protection</strong> - all portable power tools must be RCD-protected (30mA trip)</li>
                      <li><strong>Appropriate PPE</strong> - safety glasses, gloves, ear defenders as required by task</li>
                      <li><strong>Workpiece security</strong> - clamp or secure items before cutting, drilling, or grinding</li>
                      <li><strong>Correct technique</strong> - maintain firm grip, stable stance, and controlled operation</li>
                      <li><strong>Environmental awareness</strong> - check for hidden services, adequate lighting, and stable surfaces</li>
                    </ul>
                    
                    <div className="mt-3 p-3 bg-[#121212]/50 rounded border">
                      <p className="text-xs sm:text-sm text-white mb-2"><strong>Specific tool safety:</strong></p>
                      <ul className="text-xs text-white list-disc ml-4 space-y-1">
                        <li><strong>Drills:</strong> Remove chuck key before use, drill pilot holes for large bits, avoid loose clothing</li>
                        <li><strong>Grinders:</strong> Use correct disc type, check guard position, wear face protection</li>
                        <li><strong>Saws:</strong> Allow blade to stop before setting down, keep hands away from cutting line</li>
                        <li><strong>Sanders:</strong> Use dust extraction, secure workpiece, maintain steady pressure</li>
                        <li><strong>Impact drivers:</strong> Use correct bits, avoid over-tightening, protect surrounding surfaces</li>
                      </ul>
                    </div>
                    
                    <div className="mt-3 p-3 bg-amber-50/50 dark:bg-amber-900/10 rounded border border-amber-200/30">
                      <p className="text-xs sm:text-sm text-white mb-2"><strong>Battery tool considerations:</strong></p>
                      <p className="text-xs text-white">
                        Cordless tools eliminate trailing lead hazards but require attention to battery condition, charging safety, and power management. Store batteries in dry conditions and never attempt to repair damaged battery packs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Maintenance and Storage */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">5. Maintenance and Storage</h3>
            <p className="text-base text-white mb-4">
              Proper maintenance and storage are essential for tool safety, longevity, and legal compliance:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-elec-yellow mb-1">Tool Maintenance and Storage Systems</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Daily inspection</strong> - check tools before and after each use for defects</li>
                      <li><strong>Immediate removal</strong> - tag and remove faulty tools from service immediately</li>
                      <li><strong>Cleaning procedures</strong> - keep tools clean and free from debris and contaminants</li>
                      <li><strong>Proper storage</strong> - store in correct cases, racks, or designated areas</li>
                      <li><strong>Environmental protection</strong> - keep tools dry and protected from damage</li>
                      <li><strong>Regular maintenance</strong> - follow manufacturer schedules for servicing and calibration</li>
                    </ul>
                    
                    <div className="mt-3 p-3 bg-[#121212]/50 rounded border">
                      <p className="text-xs sm:text-sm text-white mb-2"><strong>PAT testing schedule:</strong></p>
                      <p className="text-xs text-white">
                        Portable Appliance Testing frequency depends on equipment type and environment. Construction sites typically require 3-monthly testing, while office environments may allow annual testing. Keep records of all tests and inspections.
                      </p>
                    </div>
                    
                    <div className="mt-3 p-3 bg-[#121212]/50 rounded border">
                      <p className="text-xs sm:text-sm text-white mb-2"><strong>Tool tagging system:</strong></p>
                      <p className="text-xs text-white">
                        Use clear tagging to identify tool status - serviceable, due for testing, or defective. Red tags indicate tools must not be used. Ensure all team members understand the tagging system and respect tool status indicators.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Wrench className="w-5 h-5" />
            Practical Guidance (On-Site Tips)
          </h2>
          <div className="grid gap-4">
            <div className="p-4 bg-transparent rounded-lg border border-border/10">
              <h3 className="font-medium text-white mb-2">Pre-Work Safety Checks</h3>
              <ul className="text-xs sm:text-sm text-white space-y-1 list-disc ml-5">
                <li>Always check for buried cables/pipes before drilling into walls using a cable detector</li>
                <li>Verify RCD protection is working before connecting power tools</li>
                <li>Ensure adequate lighting and ventilation in work areas</li>
                <li>Keep first aid kit and emergency contacts readily available</li>
              </ul>
            </div>
            
            <div className="p-4 bg-transparent rounded-lg border border-border/10">
              <h3 className="font-medium text-white mb-2">Tool Management Best Practices</h3>
              <ul className="text-xs sm:text-sm text-white space-y-1 list-disc ml-5">
                <li>Keep battery chargers and cordless tools dry and off the floor</li>
                <li>Use corded tools with RCD protection at all times</li>
                <li>Carry only the tools you need when working at height</li>
                <li>Mark personal tools with your name to prevent mix-ups on site</li>
              </ul>
            </div>
            
            <div className="p-4 bg-transparent rounded-lg border border-border/10">
              <h3 className="font-medium text-white mb-2">Emergency Procedures</h3>
              <ul className="text-xs sm:text-sm text-white space-y-1 list-disc ml-5">
                <li>Know how to quickly disconnect power in case of tool malfunction</li>
                <li>Report all tool defects immediately, no matter how minor</li>
                <li>Never attempt field repairs on electrical tools</li>
                <li>Keep emergency contact numbers and procedures visible</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Real-World Examples */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Real-World Examples
          </h2>
          
          <div className="space-y-6">
            <div className="p-5 border border-red-200/50 bg-red-50/50 dark:bg-red-900/10 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-1" />
                <div>
                  <h3 className="font-medium text-red-800 dark:text-elec-yellow mb-2">Case Study 1: Improper Tool Use</h3>
                  <p className="text-xs sm:text-sm text-white mb-2">
                    On a housing development, an apprentice used a blunt screwdriver on a consumer unit, causing the tool to slip and cut his hand badly. The wrong-sized tool created excessive force requirements and loss of control.
                  </p>
                  <p className="text-xs text-white bg-[#121212]/50 p-2 rounded">
                    <strong>Prevention:</strong> Using the correct size insulated screwdriver would have prevented slipping and provided electrical protection. Regular tool maintenance ensures cutting edges remain effective.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-5 border border-red-200/50 bg-red-50/50 dark:bg-red-900/10 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-1" />
                <div>
                  <h3 className="font-medium text-red-800 dark:text-elec-yellow mb-2">Case Study 2: Electrical Safety Failure</h3>
                  <p className="text-xs sm:text-sm text-white mb-2">
                    A contractor suffered electric shock when using a power drill with damaged cable insulation. The absence of RCD protection meant the fault was not detected until contact occurred.
                  </p>
                  <p className="text-xs text-white bg-[#121212]/50 p-2 rounded">
                    <strong>Prevention:</strong> Daily visual inspection would have identified the damaged cable. RCD protection would have disconnected the supply immediately upon fault occurrence.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-5 border border-green-200/50 bg-green-50/50 dark:bg-green-900/10 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-medium text-green-800 dark:text-green-300 mb-2">Case Study 3: Good Practice Example</h3>
                  <p className="text-xs sm:text-sm text-white mb-2">
                    An experienced electrician discovered a faulty angle grinder during pre-use inspection. The tool was immediately tagged and removed from service, preventing potential injury to other workers.
                  </p>
                  <p className="text-xs text-white bg-[#121212]/50 p-2 rounded">
                    <strong>Good Practice:</strong> Regular inspection, immediate action on defects, and clear communication protected the entire team. The tool was professionally repaired before returning to service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQ */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <HardHat className="w-5 h-5" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-4 last:border-b-0">
                <h3 className="font-medium text-white mb-2">{faq.question}</h3>
                <p className="text-sm text-white">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <ClipboardList className="w-5 h-5" />
            Pocket Guide (Key Takeaways)
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
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
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Book className="w-5 h-5" />
            Recap
          </h2>
          <p className="text-base text-white mb-4">In this subsection, you learned:</p>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>The legal requirements for tool safety under PUWER and EAWR.</li>
            <li>Hazards linked to tool use and how to avoid them.</li>
            <li>Best practice for both hand and power tool use.</li>
            <li>The importance of tool inspection, maintenance, and storage.</li>
            <li>Practical, on-site habits that improve safety and efficiency.</li>
          </ul>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            Knowledge Check Quiz
          </h2>
          <Quiz questions={quizQuestions} />
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-6 border-t border-white/10">
          <Button variant="outline" asChild>
            <Link to="module4-section7/subsection1" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back: Manual Handling
            </Link>
          </Button>
          
          <Button asChild>
            <Link to="module4-section7/subsection3" className="flex items-center gap-2">
              Next: Working at Height
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module4Section7_2;