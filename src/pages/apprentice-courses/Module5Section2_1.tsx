import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";
import { useState } from "react";

const TITLE = "What Makes a 'Safe and Functional' Design - Module 5.2.1 | Level 2 Electrical Course";
const DESCRIPTION = "Learn what makes electrical designs both safe and functional, covering BS 7671 requirements, safety principles, and user-focused design considerations for UK electrical installations.";

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
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
              Back to Section 5.2
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
              <span className="text-white/60">Section 5.2.1</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              What Makes a 'Safe and Functional' Design
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Understanding the principles that balance technical requirements, regulatory compliance, and user needs in electrical design.
            </p>
          </header>

          {/* Summary Box */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
                <ul className="text-white/80 text-sm space-y-1 list-disc pl-4">
                  <li>Safe design prevents danger to people, property, and equipment.</li>
                  <li>Functional design meets user needs and intended use.</li>
                  <li>Both must comply with BS 7671, Building Regulations, and manufacturer guidance.</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
                <ul className="text-white/80 text-sm space-y-1 list-disc pl-4">
                  <li><strong>Spot:</strong> Shock protection, overcurrent protection, fire prevention measures.</li>
                  <li><strong>Use:</strong> Apply BS 7671 requirements, consider accessibility needs.</li>
                  <li><strong>Check:</strong> Adequate outlets, proper protection, future expansion allowance.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">00</span>
              Learning Outcomes
            </h2>
            <ul className="text-white/80 space-y-2 list-disc pl-6">
              <li>Explain the meaning of a "safe and functional" electrical design.</li>
              <li>Identify key safety principles (shock protection, overload protection, fire prevention).</li>
              <li>Recognise user-focused design considerations (accessibility, usability, maintenance).</li>
              <li>Apply BS 7671 requirements to design decisions.</li>
              <li>Understand how poor design impacts safety, compliance, and cost.</li>
            </ul>
          </section>

          {/* Section 1: Defining Safe and Functional Design */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Defining a Safe and Functional Design
            </h2>
            <p className="text-white/80 mb-4">
              A good electrical design must achieve two key objectives:
            </p>

            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">Safe Design</p>
                <p className="text-white/80 mb-2"><strong>Prevents danger:</strong> Protects people, property, and equipment from electrical hazards.</p>
                <ul className="text-white/70 text-sm space-y-1 list-disc pl-4">
                  <li>Shock protection through proper earthing and RCD protection</li>
                  <li>Fire prevention through correct cable sizing and protection</li>
                  <li>Overcurrent protection to prevent equipment damage</li>
                  <li>Compliance with BS 7671 Wiring Regulations</li>
                </ul>
                <div className="mt-3 p-2 bg-white/5 rounded text-sm text-white/70">
                  <strong>Key principle:</strong> Safety is never optional - it's the foundation of all electrical design
                </div>
              </div>

              <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
                <p className="font-semibold text-green-400 mb-2">Functional Design</p>
                <p className="text-white/80 mb-2"><strong>Meets user needs:</strong> Ensures the installation serves its intended purpose effectively.</p>
                <ul className="text-white/70 text-sm space-y-1 list-disc pl-4">
                  <li>Sufficient socket outlets to avoid extension lead dependence</li>
                  <li>Appropriate lighting levels for the space and activities</li>
                  <li>Circuits planned to match electrical demand</li>
                  <li>Accessibility requirements under Building Regulations Part M</li>
                </ul>
                <div className="mt-3 p-2 bg-white/5 rounded text-sm text-white/70">
                  <strong>Key principle:</strong> Good design anticipates user needs and provides practical solutions
                </div>
              </div>
            </div>

            <InlineCheck
              id="safe-functional-check"
              question={quickCheckQuestions[0].question}
              options={quickCheckQuestions[0].options}
              correctIndex={quickCheckQuestions[0].correctIndex}
              explanation={quickCheckQuestions[0].explanation}
            />
          </section>

          {/* Section 2: Core Safety Principles */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Core Safety Principles
            </h2>
            <p className="text-white/80 mb-4">
              Three fundamental safety principles underpin all electrical design decisions:
            </p>

            <div className="p-4 rounded-lg bg-red-500/5 border-l-2 border-red-500/50 mb-6">
              <p className="font-semibold text-red-400 mb-3">Safety Principles in Design</p>

              <div className="space-y-4">
                <div>
                  <p className="text-white/80 font-medium mb-1">Shock Protection</p>
                  <ul className="text-white/70 text-sm space-y-1 list-disc pl-4">
                    <li>Basic protection: insulation, enclosure, barriers</li>
                    <li>Fault protection: earthing, RCD protection, automatic disconnection</li>
                    <li>Additional protection: RCDs for socket outlets up to 32A</li>
                  </ul>
                </div>

                <div>
                  <p className="text-white/80 font-medium mb-1">Overcurrent Protection</p>
                  <ul className="text-white/70 text-sm space-y-1 list-disc pl-4">
                    <li>Fuses and MCBs sized to protect cables and equipment</li>
                    <li>Discrimination to isolate faults without affecting healthy circuits</li>
                    <li>Breaking capacity adequate for prospective fault current</li>
                  </ul>
                </div>

                <div>
                  <p className="text-white/80 font-medium mb-1">Fire Prevention</p>
                  <ul className="text-white/70 text-sm space-y-1 list-disc pl-4">
                    <li>Correct cable sizing for current-carrying capacity</li>
                    <li>Proper cable containment and fire barriers</li>
                    <li>Arc fault protection in high-risk applications</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 p-2 bg-white/5 rounded text-sm text-white/70">
                <strong>Remember:</strong> All three principles work together to create comprehensive protection
              </div>
            </div>

            <InlineCheck
              id="safety-principles-check"
              question={quickCheckQuestions[1].question}
              options={quickCheckQuestions[1].options}
              correctIndex={quickCheckQuestions[1].correctIndex}
              explanation={quickCheckQuestions[1].explanation}
            />
          </section>

          {/* Section 3: Functional Requirements */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Functional Requirements
            </h2>
            <p className="text-white/80 mb-4">
              Functional design ensures the installation serves users effectively and efficiently:
            </p>

            <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50 mb-6">
              <p className="font-semibold text-purple-400 mb-3">User-Focused Design Elements</p>

              <div className="space-y-4">
                <div>
                  <p className="text-white/80 font-medium mb-1">Socket Outlet Provision</p>
                  <ul className="text-white/70 text-sm space-y-1 list-disc pl-4">
                    <li>Avoid over-reliance on extension leads (safety hazard)</li>
                    <li>Consider furniture layout and room usage patterns</li>
                    <li>Plan for increased demand (more electrical devices over time)</li>
                  </ul>
                </div>

                <div>
                  <p className="text-white/80 font-medium mb-1">Circuit Planning</p>
                  <ul className="text-white/70 text-sm space-y-1 list-disc pl-4">
                    <li>Separate high-demand areas (kitchens, workshops)</li>
                    <li>Ring final circuits for general use areas</li>
                    <li>Dedicated circuits for fixed appliances</li>
                  </ul>
                </div>

                <div>
                  <p className="text-white/80 font-medium mb-1">Lighting Design</p>
                  <ul className="text-white/70 text-sm space-y-1 list-disc pl-4">
                    <li>Adequate coverage without shadows or dark spots</li>
                    <li>Emergency lighting where required by regulations</li>
                    <li>Energy-efficient solutions and smart controls</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 p-2 bg-white/5 rounded text-sm text-white/70">
                <strong>Design principle:</strong> Plan for real-world use, not just minimum compliance
              </div>
            </div>

            <InlineCheck
              id="functional-requirements-check"
              question={quickCheckQuestions[2].question}
              options={quickCheckQuestions[2].options}
              correctIndex={quickCheckQuestions[2].correctIndex}
              explanation={quickCheckQuestions[2].explanation}
            />
          </section>

          {/* Section 4: Design Standards and Regulations */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Design Standards and Regulations
            </h2>
            <p className="text-white/80 mb-4">
              UK electrical design must comply with multiple regulatory frameworks:
            </p>

            <div className="p-4 rounded-lg bg-white/5 border border-white/10 mb-4">
              <ul className="text-white/80 space-y-2 text-sm">
                <li><strong>BS 7671:</strong> Requires installations to be "safe, serviceable, and meet user needs."</li>
                <li><strong>Building Regulations (Part P, Part M):</strong> Accessibility and safe use of electrical systems in dwellings.</li>
                <li><strong>Manufacturer Instructions:</strong> Must be followed to maintain compliance and warranties.</li>
              </ul>
            </div>
          </section>

          {/* Section 5: Consequences of Poor Design */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Consequences of Poor Design
            </h2>
            <p className="text-white/80 mb-4">
              Poor design decisions create serious risks and costs:
            </p>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 mb-4">
              <ul className="text-white/80 space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>Unsafe conditions (shock, fire risk)</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>Non-compliance and failed inspections</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>Expensive rework or reputational damage</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>User dissatisfaction due to impractical layouts</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 6: Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Practical Guidance
            </h2>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-blue-500/5 border-l-2 border-blue-500/50">
                <p className="font-semibold text-blue-400 mb-2">Step 1: Initial Assessment</p>
                <ul className="text-white/70 text-sm space-y-1">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><strong>Identify intended use:</strong> Domestic, commercial, industrial applications</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><strong>Site survey:</strong> Check for damp conditions, flammable materials, access restrictions</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><strong>Risk assessment:</strong> Identify specific hazards and protective measures needed</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><strong>User consultation:</strong> Understand actual needs vs perceived requirements</span></li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
                <p className="font-semibold text-green-400 mb-2">Step 2: Technical Planning</p>
                <ul className="text-white/70 text-sm space-y-1">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><strong>Supply characteristics:</strong> Voltage, earthing arrangement (TN-S, TN-C-S, TT), capacity</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><strong>Load calculations:</strong> Assess maximum demand and diversity factors</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><strong>Circuit design:</strong> Ring, radial, or mixed configurations based on load patterns</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><strong>Protection coordination:</strong> Ensure discrimination between devices</span></li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50">
                <p className="font-semibold text-purple-400 mb-2">Step 3: Future-Proofing</p>
                <ul className="text-white/70 text-sm space-y-1">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><strong>Spare capacity:</strong> Allow 25-30% spare capacity in consumer units</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><strong>EV charging:</strong> Consider 32A supply for future electric vehicle charging</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><strong>Smart home readiness:</strong> Plan for IoT devices and home automation</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><strong>Renewable energy:</strong> Consider solar PV and battery storage provisions</span></li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-orange-500/5 border-l-2 border-orange-500/50">
                <p className="font-semibold text-orange-400 mb-2">Step 4: Accessibility Compliance</p>
                <ul className="text-white/70 text-sm space-y-1">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><strong>Height requirements:</strong> Switches 900-1200mm, sockets 450-1200mm from floor</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><strong>Colour contrast:</strong> Visible distinction between fittings and backgrounds</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><strong>Operating force:</strong> Maximum 5N force for switches and socket operation</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span><strong>Clear zones:</strong> 300mm clear space around electrical accessories</span></li>
                </ul>
              </div>
            </div>
          </section>

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Real-World Example
            </h2>

            <div className="p-4 rounded-lg bg-orange-500/5 border-l-2 border-orange-500/50">
              <p className="font-semibold text-orange-400 mb-2">The £50,000 Design Mistake</p>
              <p className="text-white/80 mb-3 text-sm">
                <strong>The Project:</strong> A 200-unit new build housing development in Manchester where the electrical contractor installed minimal socket provision to meet basic building regulations - just one double socket per bedroom and limited kitchen outlets.
              </p>

              <div className="p-3 bg-white/5 rounded mb-3">
                <p className="font-medium text-white mb-2 text-sm">What Went Wrong:</p>
                <ul className="text-white/70 text-sm space-y-1 list-disc pl-4">
                  <li><strong>Inadequate kitchen provision:</strong> Only 4 double sockets for modern appliances</li>
                  <li><strong>Poor bedroom planning:</strong> Single sockets meant residents couldn't charge phones whilst using bedside lamps</li>
                  <li><strong>No home office consideration:</strong> No provision for laptops, printers, or multiple devices</li>
                  <li><strong>EV charging oversight:</strong> No provision for future electric vehicle charging</li>
                </ul>
              </div>

              <div className="p-3 bg-red-500/10 rounded mb-3 border border-red-500/30">
                <p className="font-medium text-red-400 mb-2 text-sm">The Consequences:</p>
                <ul className="text-white/70 text-sm space-y-1 list-disc pl-4">
                  <li><strong>Safety hazards:</strong> Residents used dangerous daisy-chained extension leads</li>
                  <li><strong>Customer complaints:</strong> 180 out of 200 homes complained within 6 months</li>
                  <li><strong>Remedial costs:</strong> £50,000 to retrofit additional circuits and outlets</li>
                  <li><strong>Programme delay:</strong> 8-week delay to final handovers</li>
                  <li><strong>Reputation damage:</strong> Poor reviews affecting future sales</li>
                </ul>
              </div>

              <div className="p-3 bg-green-500/10 rounded border border-green-500/30">
                <p className="font-medium text-green-400 mb-2 text-sm">The Better Approach:</p>
                <ul className="text-white/70 text-sm space-y-1 list-disc pl-4">
                  <li><strong>User research:</strong> Survey typical household electrical usage patterns</li>
                  <li><strong>Future-proofing:</strong> Consider emerging technologies (smart homes, EV charging)</li>
                  <li><strong>Room-by-room analysis:</strong> Match outlet provision to likely furniture layouts</li>
                  <li><strong>Quality over compliance:</strong> Exceed minimum standards for satisfied customers</li>
                  <li><strong>Cost analysis:</strong> Extra £200 per house during construction vs £2,500 retrofit</li>
                </ul>
              </div>

              <div className="mt-3 p-2 bg-white/5 rounded text-sm text-white/70">
                <strong>Key lesson:</strong> Good design costs slightly more upfront but prevents expensive problems later. Always design for real-world usage, not just regulatory compliance.
              </div>
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Pocket Guide – Safe and Functional Design
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/30">
                <p className="font-semibold text-green-400 mb-2 text-sm">Safety Essentials</p>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>• Follow BS 7671 Wiring Regulations</li>
                  <li>• RCD protection for socket outlets ≤32A</li>
                  <li>• Size cables for current-carrying capacity</li>
                  <li>• Provide adequate fault protection</li>
                  <li>• Maintain safe working clearances</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/30">
                <p className="font-semibold text-blue-400 mb-2 text-sm">Functional Requirements</p>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>• Adequate socket outlets for room usage</li>
                  <li>• Sufficient lighting without dark spots</li>
                  <li>• Dedicated circuits for high-load appliances</li>
                  <li>• Consider furniture layouts and user patterns</li>
                  <li>• Plan circuits for balanced loading</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-purple-500/5 border border-purple-500/30">
                <p className="font-semibold text-purple-400 mb-2 text-sm">Compliance & Quality</p>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>• Meet Building Regulations Part P & M</li>
                  <li>• Follow manufacturer instructions</li>
                  <li>• Ensure accessibility compliance</li>
                  <li>• Plan for inspection and testing</li>
                  <li>• Maintain comprehensive documentation</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-orange-500/5 border border-orange-500/30">
                <p className="font-semibold text-orange-400 mb-2 text-sm">Future-Proofing</p>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>• Allow for EV charging points</li>
                  <li>• Plan for smart home technology</li>
                  <li>• Consider renewable energy provisions</li>
                  <li>• Allow 25-30% spare capacity</li>
                  <li>• Design for easy maintenance access</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 p-3 bg-white/5 rounded text-center">
              <p className="text-white/70 text-sm">
                <strong>Remember:</strong> Good design balances safety, functionality, compliance, and future needs.
                Always consider real-world usage patterns, not just minimum regulatory requirements.
              </p>
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Recap
            </h2>
            <p className="text-white/80">
              In this subsection, you learned what makes an electrical design both safe and functional. You covered the three main safety principles (shock protection, overload/fire protection), the importance of accessibility and usability, and the consequences of poor design. You also explored how regulations like BS 7671 and Part P/M guide your design decisions.
            </p>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">10</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-white/10 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors min-h-[44px] touch-manipulation"
                  >
                    <span className="font-medium text-white text-sm pr-4">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-white/60 flex-shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === index && (
                    <div className="px-4 pb-4 text-white/70 text-sm">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <Quiz questions={quizQuestions} />
          </section>

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Section 5.2
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../2-2">
                Next: Load Estimation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module5Section2_1;
