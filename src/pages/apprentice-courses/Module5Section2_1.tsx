import { ArrowLeft, ArrowRight, FileText, Target, CheckCircle, AlertTriangle, Users, BookOpen, Clipboard, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "What Makes a 'Safe and Functional' Design - Module 5.2.1 | Level 2 Electrical Course";
const DESCRIPTION = "Learn what makes electrical designs both safe and functional, covering BS 7671 requirements, safety principles, and user-focused design considerations for UK electrical installations.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "Which regulation sets the standard for electrical safety in the UK?",
    options: ["BS 5266", "BS 5839", "BS 7671", "BS EN 50200"],
    correctIndex: 2,
    explanation: "BS 7671 is the UK Wiring Regulations that sets the standard for electrical safety."
  },
  {
    id: 2,
    question: "True or False: A design can be functional without being safe.",
    options: ["True", "False"],
    correctIndex: 1,
    explanation: "False - A design must be both safe and functional. Safety is a fundamental requirement."
  },
  {
    id: 3,
    question: "What are the three core safety principles in electrical design?",
    options: ["Cost, speed, appearance", "Shock protection, overcurrent protection, fire prevention", "Materials, labour, time", "Planning, installing, testing"],
    correctIndex: 1,
    explanation: "The three core safety principles are shock protection, overcurrent protection, and fire prevention."
  }
];

const Module5Section2_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "Which regulation sets the standard for electrical safety in the UK?",
      options: ["BS 5266", "BS 5839", "BS 7671", "BS EN 50200"],
      correctAnswer: 2,
      explanation: "BS 7671 is the UK Wiring Regulations that sets the standard for electrical safety."
    },
    {
      id: 2,
      question: "True or False: A design can be functional without being safe.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False - A design must be both safe and functional. Safety is a fundamental requirement."
    },
    {
      id: 3,
      question: "Name two types of overcurrent protection devices.",
      options: ["Fuse and MCB", "RCD and RCBO", "Cable and Conduit", "Socket and Switch"],
      correctAnswer: 0,
      explanation: "Fuses and MCBs (Miniature Circuit Breakers) are overcurrent protection devices."
    },
    {
      id: 4,
      question: "What is one risk of undersized cables?",
      options: ["Too expensive", "Overheating and fire hazard", "Too difficult to install", "Poor appearance"],
      correctAnswer: 1,
      explanation: "Undersized cables can overheat due to excessive current, creating a fire hazard."
    },
    {
      id: 5,
      question: "Why should socket outlet numbers be carefully planned?",
      options: ["To save money", "To avoid overloading circuits and reliance on extension leads", "To look neat", "To meet colour requirements"],
      correctAnswer: 1,
      explanation: "Proper planning prevents circuit overloading and reduces dangerous reliance on extension leads."
    },
    {
      id: 6,
      question: "Which regulation covers accessibility of switches and sockets?",
      options: ["Part P", "Part M", "Part L", "Part B"],
      correctAnswer: 1,
      explanation: "Building Regulations Part M covers accessibility requirements for switches and sockets."
    },
    {
      id: 7,
      question: "Give one consequence of ignoring manufacturer installation instructions.",
      options: ["Better performance", "Non-compliance or unsafe installation", "Faster installation", "Lower costs"],
      correctAnswer: 1,
      explanation: "Ignoring manufacturer instructions can lead to non-compliance, voided warranties, or unsafe installations."
    },
    {
      id: 8,
      question: "What is the main role of RCDs?",
      options: ["Control lighting", "Protect against electric shock", "Measure voltage", "Switch circuits"],
      correctAnswer: 1,
      explanation: "RCDs protect against electric shock by detecting earth leakage currents."
    },
    {
      id: 9,
      question: "Why should future expansion be considered in design?",
      options: ["To meet regulations", "To avoid costly alterations and meet future needs", "To use more materials", "To increase profits"],
      correctAnswer: 1,
      explanation: "Considering future expansion prevents costly alterations and ensures the installation can meet evolving user needs."
    },
    {
      id: 10,
      question: "In terms of design, what does 'functional' mean?",
      options: ["Looks good", "Costs less", "Meets user needs and is practical", "Uses fewer materials"],
      correctAnswer: 2,
      explanation: "Functional means the installation meets user needs and is practical for everyday use."
    }
  ];

  const faqs = [
    {
      question: "What's the difference between 'safe' and 'compliant'?",
      answer: "Safe means preventing danger to people and property. Compliant means meeting all relevant regulations and standards. An installation should be both safe and compliant."
    },
    {
      question: "How do I know if my design has enough socket outlets?",
      answer: "Consider the room's intended use, furniture layout, and likely electrical loads. Avoid forcing users to rely on extension leads, which create hazards."
    },
    {
      question: "What happens if I don't follow manufacturer instructions?",
      answer: "You risk non-compliance, voided warranties, unsafe installations, and potential liability issues. Always follow manufacturer guidance."
    },
    {
      question: "How does poor design affect costs?",
      answer: "Poor design leads to rework, failed inspections, user complaints, and potential safety issues - all of which are expensive to fix after installation."
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
              Back to Section 2
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
              Section 5.2.1
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            What Makes a 'Safe and Functional' Design
          </h1>
          <p className="text-white">
            Understanding the principles that balance technical requirements, regulatory compliance, and user needs in electrical design.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Safe design prevents danger to people, property, and equipment.</li>
                <li>Functional design meets user needs and intended use.</li>
                <li>Both must comply with BS 7671, Building Regulations, and manufacturer guidance.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Shock protection, overcurrent protection, fire prevention measures.</li>
                <li><strong>Use:</strong> Apply BS 7671 requirements, consider accessibility needs.</li>
                <li><strong>Check:</strong> Adequate outlets, proper protection, future expansion allowance.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>Explain the meaning of a "safe and functional" electrical design.</li>
            <li>Identify key safety principles (shock protection, overload protection, fire prevention).</li>
            <li>Recognise user-focused design considerations (accessibility, usability, maintenance).</li>
            <li>Apply BS 7671 requirements to design decisions.</li>
            <li>Understand how poor design impacts safety, compliance, and cost.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content / Learning</h2>

          {/* Definition of Safe and Functional Design */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">1. Defining a Safe and Functional Design</h3>
            <p className="text-base text-white mb-4">
              A good electrical design must achieve two key objectives:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-1">Safe Design</p>
                    <p className="text-base text-white mb-2"><strong>Prevents danger:</strong> Protects people, property, and equipment from electrical hazards.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Shock protection through proper earthing and RCD protection</li>
                      <li>Fire prevention through correct cable sizing and protection</li>
                      <li>Overcurrent protection to prevent equipment damage</li>
                      <li>Compliance with BS 7671 Wiring Regulations</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Key principle:</strong> Safety is never optional - it's the foundation of all electrical design
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 mt-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Functional Design</p>
                    <p className="text-base text-white mb-2"><strong>Meets user needs:</strong> Ensures the installation serves its intended purpose effectively.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Sufficient socket outlets to avoid extension lead dependence</li>
                      <li>Appropriate lighting levels for the space and activities</li>
                      <li>Circuits planned to match electrical demand</li>
                      <li>Accessibility requirements under Building Regulations Part M</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Key principle:</strong> Good design anticipates user needs and provides practical solutions
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="safe-functional-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Core Safety Principles */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">2. Core Safety Principles</h3>
            <p className="text-base text-white mb-4">
              Three fundamental safety principles underpin all electrical design decisions:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 text-elec-yellow mb-1">Safety Principles in Design</p>
                    <p className="text-base text-white mb-2"><strong>Shock Protection:</strong> Preventing contact with live parts and earth fault protection.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Basic protection: insulation, enclosure, barriers</li>
                      <li>Fault protection: earthing, RCD protection, automatic disconnection</li>
                      <li>Additional protection: RCDs for socket outlets up to 32A</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Overcurrent Protection:</strong> Protecting against overload and short-circuit currents.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Fuses and MCBs sized to protect cables and equipment</li>
                      <li>Discrimination to isolate faults without affecting healthy circuits</li>
                      <li>Breaking capacity adequate for prospective fault current</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Fire Prevention:</strong> Preventing overheating and ignition of materials.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Correct cable sizing for current-carrying capacity</li>
                      <li>Proper cable containment and fire barriers</li>
                      <li>Arc fault protection in high-risk applications</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Remember:</strong> All three principles work together to create comprehensive protection
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="safety-principles-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Functional Requirements */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">3. Functional Requirements</h3>
            <p className="text-base text-white mb-4">
              Functional design ensures the installation serves users effectively and efficiently:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 text-elec-yellow mb-1">User-Focused Design Elements</p>
                    <p className="text-base text-white mb-2"><strong>Socket outlet provision:</strong> Adequate numbers to meet user needs.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Avoid over-reliance on extension leads (safety hazard)</li>
                      <li>Consider furniture layout and room usage patterns</li>
                      <li>Plan for increased demand (more electrical devices over time)</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Circuit planning:</strong> Match electrical demand to circuit capacity.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Separate high-demand areas (kitchens, workshops)</li>
                      <li>Ring final circuits for general use areas</li>
                      <li>Dedicated circuits for fixed appliances</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Lighting design:</strong> Appropriate illumination levels and control.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Adequate coverage without shadows or dark spots</li>
                      <li>Emergency lighting where required by regulations</li>
                      <li>Energy-efficient solutions and smart controls</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Design principle:</strong> Plan for real-world use, not just minimum compliance
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="functional-requirements-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Design Standards and Regulations */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">4. Design Standards and Regulations</h3>
            <p className="text-base text-white mb-4">
              UK electrical design must comply with multiple regulatory frameworks:
            </p>
            
            <div className="bg-[#121212]/50 p-4 rounded-lg border border-white/10 mb-4">
              <ul className="text-xs sm:text-sm text-white space-y-2">
                <li><strong>BS 7671:</strong> Requires installations to be "safe, serviceable, and meet user needs."</li>
                <li><strong>Building Regulations (Part P, Part M):</strong> Accessibility and safe use of electrical systems in dwellings.</li>
                <li><strong>Manufacturer Instructions:</strong> Must be followed to maintain compliance and warranties.</li>
              </ul>
            </div>
          </section>

          {/* Consequences of Poor Design */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">5. Consequences of Poor Design</h3>
            <p className="text-base text-white mb-4">
              Poor design decisions create serious risks and costs:
            </p>
            
            <div className="bg-card p-4 rounded-lg border border-red-200 dark:border-red-800 mb-4">
              <ul className="text-xs sm:text-sm text-white space-y-2">
                <li>• Unsafe conditions (shock, fire risk)</li>
                <li>• Non-compliance and failed inspections</li>
                <li>• Expensive rework or reputational damage</li>
                <li>• User dissatisfaction due to impractical layouts</li>
              </ul>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Practical Guidance</h3>
            
            <div className="space-y-4">
              <div className="bg-card p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="font-medium text-elec-yellow text-elec-yellow mb-2">Step 1: Initial Assessment</p>
                <ul className="text-xs sm:text-sm text-white space-y-1">
                  <li>✅ <strong>Identify intended use:</strong> Domestic, commercial, industrial applications</li>
                  <li>✅ <strong>Site survey:</strong> Check for damp conditions, flammable materials, access restrictions</li>
                  <li>✅ <strong>Risk assessment:</strong> Identify specific hazards and protective measures needed</li>
                  <li>✅ <strong>User consultation:</strong> Understand actual needs vs perceived requirements</li>
                </ul>
              </div>
              
              <div className="bg-card p-4 rounded-lg border border-green-200 dark:border-green-800">
                <p className="font-medium text-green-600 dark:text-green-400 mb-2">Step 2: Technical Planning</p>
                <ul className="text-xs sm:text-sm text-white space-y-1">
                  <li>✅ <strong>Supply characteristics:</strong> Voltage, earthing arrangement (TN-S, TN-C-S, TT), capacity</li>
                  <li>✅ <strong>Load calculations:</strong> Assess maximum demand and diversity factors</li>
                  <li>✅ <strong>Circuit design:</strong> Ring, radial, or mixed configurations based on load patterns</li>
                  <li>✅ <strong>Protection coordination:</strong> Ensure discrimination between devices</li>
                </ul>
              </div>
              
              <div className="bg-card p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                <p className="font-medium text-purple-600 text-elec-yellow mb-2">Step 3: Future-Proofing</p>
                <ul className="text-xs sm:text-sm text-white space-y-1">
                  <li>✅ <strong>Spare capacity:</strong> Allow 25-30% spare capacity in consumer units</li>
                  <li>✅ <strong>EV charging:</strong> Consider 32A supply for future electric vehicle charging</li>
                  <li>✅ <strong>Smart home readiness:</strong> Plan for IoT devices and home automation</li>
                  <li>✅ <strong>Renewable energy:</strong> Consider solar PV and battery storage provisions</li>
                </ul>
              </div>
              
              <div className="bg-card p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                <p className="font-medium text-orange-600 text-elec-yellow mb-2">Step 4: Accessibility Compliance</p>
                <ul className="text-xs sm:text-sm text-white space-y-1">
                  <li>✅ <strong>Height requirements:</strong> Switches 900-1200mm, sockets 450-1200mm from floor</li>
                  <li>✅ <strong>Colour contrast:</strong> Visible distinction between fittings and backgrounds</li>
                  <li>✅ <strong>Operating force:</strong> Maximum 5N force for switches and socket operation</li>
                  <li>✅ <strong>Clear zones:</strong> 300mm clear space around electrical accessories</li>
                </ul>
              </div>
            </div>
          </section>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Real-World Example</h2>
          <div className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-orange-600 text-elec-yellow mb-2">The £50,000 Design Mistake</p>
                <p className="text-base text-white mb-3">
                  <strong>The Project:</strong> A 200-unit new build housing development in Manchester where the electrical contractor installed minimal socket provision to meet basic building regulations - just one double socket per bedroom and limited kitchen outlets.
                </p>
                
                <div className="bg-[#121212]/30 p-4 rounded-lg mb-3">
                  <p className="font-medium text-white mb-2">What Went Wrong:</p>
                  <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                    <li><strong>Inadequate kitchen provision:</strong> Only 4 double sockets for modern appliances (kettle, toaster, microwave, food processor, coffee machine, phone charger)</li>
                    <li><strong>Poor bedroom planning:</strong> Single sockets meant residents couldn't charge phones whilst using bedside lamps</li>
                    <li><strong>No home office consideration:</strong> No provision for laptops, printers, or multiple devices in spare rooms</li>
                    <li><strong>EV charging oversight:</strong> No provision for future electric vehicle charging points</li>
                  </ul>
                </div>
                
                <div className="bg-card p-4 rounded-lg mb-3 border border-red-500/20">
                  <p className="font-medium text-red-600 text-elec-yellow mb-2">The Consequences:</p>
                  <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                    <li><strong>Safety hazards:</strong> Residents used dangerous daisy-chained extension leads</li>
                    <li><strong>Customer complaints:</strong> 180 out of 200 homes complained within 6 months</li>
                    <li><strong>Remedial costs:</strong> £50,000 to retrofit additional circuits and outlets</li>
                    <li><strong>Programme delay:</strong> 8-week delay to final handovers affecting sales</li>
                    <li><strong>Reputation damage:</strong> Poor reviews affecting future sales and company reputation</li>
                    <li><strong>Legal implications:</strong> Potential liability for dangerous installations created by inadequate provision</li>
                  </ul>
                </div>
                
                <div className="bg-card p-4 rounded-lg border border-green-500/20">
                  <p className="font-medium text-green-600 dark:text-green-400 mb-2">The Better Approach:</p>
                  <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                    <li><strong>User research:</strong> Survey typical household electrical usage patterns</li>
                    <li><strong>Future-proofing:</strong> Consider emerging technologies (smart homes, EV charging)</li>
                    <li><strong>Room-by-room analysis:</strong> Match outlet provision to likely furniture layouts and usage</li>
                    <li><strong>Quality over compliance:</strong> Exceed minimum standards to create satisfied customers</li>
                    <li><strong>Cost analysis:</strong> Extra £200 per house during construction vs £2,500 retrofit costs</li>
                  </ul>
                </div>
                
                <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-3 rounded border mt-3">
                  <strong>Key lesson:</strong> Good design costs slightly more upfront but prevents expensive problems later. Always design for real-world usage, not just regulatory compliance.
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
            <div className="flex items-center gap-3">
              <Clipboard className="w-6 h-6" />
              Pocket Guide – Safe and Functional Design
            </div>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4">
              <div className="bg-card p-4 rounded-lg border border-green-200 dark:border-green-800">
                <p className="font-medium text-green-600 dark:text-green-400 mb-2">Safety Essentials</p>
                <ul className="text-xs sm:text-sm text-white space-y-1">
                  <li>🔒 Follow BS 7671 Wiring Regulations</li>
                  <li>⚡ RCD protection for socket outlets ≤32A</li>
                  <li>🔥 Size cables for current-carrying capacity</li>
                  <li>🛡️ Provide adequate fault protection</li>
                  <li>📏 Maintain safe working clearances</li>
                </ul>
              </div>
              
              <div className="bg-card p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="font-medium text-elec-yellow text-elec-yellow mb-2">Functional Requirements</p>
                <ul className="text-xs sm:text-sm text-white space-y-1">
                  <li>🔌 Adequate socket outlets for room usage</li>
                  <li>💡 Sufficient lighting without dark spots</li>
                  <li>⚙️ Dedicated circuits for high-load appliances</li>
                  <li>🏠 Consider furniture layouts and user patterns</li>
                  <li>🔄 Plan circuits for balanced loading</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-card p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                <p className="font-medium text-purple-600 text-elec-yellow mb-2">Compliance & Quality</p>
                <ul className="text-xs sm:text-sm text-white space-y-1">
                  <li>📋 Meet Building Regulations Part P & M</li>
                  <li>📖 Follow manufacturer instructions</li>
                  <li>♿ Ensure accessibility compliance</li>
                  <li>🔍 Plan for inspection and testing</li>
                  <li>📝 Maintain comprehensive documentation</li>
                </ul>
              </div>
              
              <div className="bg-card p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                <p className="font-medium text-orange-600 text-elec-yellow mb-2">Future-Proofing</p>
                <ul className="text-xs sm:text-sm text-white space-y-1">
                  <li>🚗 Allow for EV charging points</li>
                  <li>🏡 Plan for smart home technology</li>
                  <li>☀️ Consider renewable energy provisions</li>
                  <li>📈 Allow 25-30% spare capacity</li>
                  <li>🔧 Design for easy maintenance access</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-[#121212]/50 rounded-lg border border-white/10">
            <p className="text-xs sm:text-sm text-white text-center">
              <strong>Remember:</strong> Good design balances safety, functionality, compliance, and future needs. 
              Always consider real-world usage patterns, not just minimum regulatory requirements.
            </p>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Recap</h2>
          <p className="text-base text-white">
            In this subsection, you learned what makes an electrical design both safe and functional. You covered the three main safety principles (shock protection, overload/fire protection), the importance of accessibility and usability, and the consequences of poor design. You also explored how regulations like BS 7671 and Part P/M guide your design decisions.
          </p>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-l-4 border-l-elec-yellow pl-4">
                <p className="font-medium text-white mb-2">Q: {faq.question}</p>
                <p className="text-sm text-white">A: {faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} />

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
          <Button variant="outline" asChild>
            <Link to=".." className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </Button>
          <Button asChild>
            <Link to="../2-2" className="flex items-center gap-2">
              Next
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module5Section2_1;