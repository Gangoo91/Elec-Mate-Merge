import { ArrowLeft, ArrowRight, Wrench, Target, CheckCircle, AlertTriangle, Eye, TrendingUp, Shield, Search, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Terminating Twin & Earth, Singles, and Flex - Module 4.5.3 | Level 2 Electrical Course";
const DESCRIPTION = "Master safe cable termination techniques for Twin & Earth, single-core, and flexible cables. Learn preparation, stripping, dressing, and testing procedures according to BS 7671.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "Why must the CPC in T&E be sleeved before termination?",
    options: ["For appearance", "For identification and safety requirements", "To reduce resistance"],
    correctIndex: 1,
    explanation: "BS 7671 requires the CPC to be clearly identified with green/yellow sleeving to prevent confusion and ensure safety during maintenance."
  },
  {
    id: 2,
    question: "What is the main purpose of a ferrule on a flexible conductor?",
    options: ["To improve appearance", "To prevent fine strands from spreading", "To increase conductivity"],
    correctIndex: 1,
    explanation: "Ferrules prevent fine strands from spreading when inserted into terminals, ensuring reliable connection and preventing loose strands."
  },
  {
    id: 3,
    question: "What test confirms that a conductor is firmly secured in a terminal?",
    options: ["Visual inspection", "Tug test", "Continuity test"],
    correctIndex: 1,
    explanation: "A gentle tug test verifies mechanical security of the connection, ensuring the conductor cannot be pulled out of the terminal."
  }
];

const Module4Section5_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What does the 'Earth' in Twin & Earth refer to?",
      options: [
        "The earth clamp",
        "The CPC conductor",
        "The outer sheath",
        "A grounding rod"
      ],
      correctAnswer: 1,
      explanation: "The 'Earth' refers to the Circuit Protective Conductor (CPC) that provides the earth connection for safety."
    },
    {
      id: 2,
      question: "True or False: The CPC in T&E can be left unsleeved if it is clearly identifiable.",
      options: [
        "True", 
        "False",
        "Only in domestic installations",
        "Only if marked with tape"
      ],
      correctAnswer: 1,
      explanation: "False – BS 7671 requires the CPC to be sleeved with green/yellow identification regardless of how identifiable it appears."
    },
    {
      id: 3,
      question: "What accessory prevents fine strands of a flexible conductor from spreading?",
      options: [
        "Cable tie",
        "Ferrule",
        "Gland",
        "Crimp"
      ],
      correctAnswer: 1,
      explanation: "Ferrules are fitted to the ends of stranded conductors to keep the strands together and ensure reliable termination."
    },
    {
      id: 4,
      question: "What is the recommended way to check if a conductor is securely connected?",
      options: [
        "Visual inspection only",
        "Tug test",
        "Continuity test only",
        "Resistance measurement"
      ],
      correctAnswer: 1,
      explanation: "A gentle tug test confirms mechanical security, ensuring the conductor is properly gripped by the terminal."
    },
    {
      id: 5,
      question: "Which BS standard covers requirements for secure and safe terminations?",
      options: [
        "BS 5839",
        "BS 7671",
        "BS EN 50172",
        "BS 5266"
      ],
      correctAnswer: 1,
      explanation: "BS 7671 (IET Wiring Regulations) specifies requirements for electrical terminations to ensure safety and reliability."
    },
    {
      id: 6,
      question: "Why should insulation be just inside the terminal?",
      options: [
        "To improve appearance",
        "To ensure good electrical contact without exposed copper",
        "To reduce heat generation",
        "To comply with colour coding"
      ],
      correctAnswer: 1,
      explanation: "Insulation just inside the terminal ensures full electrical contact while preventing exposed copper that could cause short circuits."
    },
    {
      id: 7,
      question: "Give one reason for using IP-rated glands on terminations.",
      options: [
        "To improve cable appearance",
        "To protect against moisture ingress and maintain IP rating",
        "To reduce installation time",
        "To increase conductor capacity"
      ],
      correctAnswer: 1,
      explanation: "IP-rated glands protect against moisture ingress, maintaining the enclosure's environmental protection rating."
    },
    {
      id: 8,
      question: "Name one common error to avoid when terminating cables.",
      options: [
        "Using the correct ferrule size",
        "Over-tightening terminals, damaging the conductor",
        "Following manufacturer instructions",
        "Testing connections properly"
      ],
      correctAnswer: 1,
      explanation: "Over-tightening can damage conductors and terminals, leading to poor connections and potential failure."
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
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 4.5.3
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Terminating Twin & Earth, Singles, and Flex
          </h1>
          <p className="text-white">
            Master safe cable termination techniques for Twin & Earth, single-core, and flexible cables, ensuring reliable connections and compliance with BS 7671.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Proper cable termination prevents loose connections and electrical faults.</li>
                <li>Different cable types require specific preparation and termination techniques.</li>
                <li>Poor terminations are a leading cause of electrical failures and fire hazards.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Cable type, conductor condition, appropriate accessories needed.</li>
                <li><strong>Use:</strong> Correct strippers, ferrules, glands, sleeving, proper technique.</li>
                <li><strong>Check:</strong> Secure connection, proper insulation, mechanical integrity.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
            <li>Identify the construction and use cases for Twin & Earth, single-core, and flexible cables in different applications.</li>
            <li>Prepare cable ends for safe and secure connection using appropriate tools and techniques.</li>
            <li>Apply correct stripping, cutting, and dressing techniques for each cable type according to BS 7671.</li>
            <li>Select and use appropriate termination accessories such as ferrules, glands, and cord grips for specific applications.</li>
            <li>Check terminations for electrical and mechanical integrity using proper testing methods.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content</h2>

          {/* Understanding Cable Types and Applications */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Understanding Cable Types and Applications</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Different cable types require specific termination techniques to ensure safety, reliability, and compliance:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-1">Twin & Earth (T&E) Cable Construction</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Primary applications:</strong> Fixed wiring in domestic and commercial installations for socket and lighting circuits.</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Construction details:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Two insulated conductors: Live (brown) and Neutral (blue)</li>
                      <li>Bare CPC (Circuit Protective Conductor) for earthing</li>
                      <li>Grey PVC outer sheath for mechanical protection</li>
                      <li>Common sizes: 1.0mm², 1.5mm², 2.5mm², 4.0mm², 6.0mm², 10.0mm²</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Installation environments:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Concealed in walls (in safe zones or with RCD protection)</li>
                      <li>Clipped direct to surfaces in appropriate routes</li>
                      <li>Underground in suitable conditions with protection</li>
                      <li>Not suitable for conduit systems (use singles instead)</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Critical requirement:</strong> CPC must always be sleeved green/yellow before termination
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-1">Single-Core Cable Systems</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>System applications:</strong> Conduit and trunking installations where individual conductor routing is required.</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Advantages of single-core systems:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Individual colour identification for each conductor function</li>
                      <li>Easier pulling through conduit systems and complex routes</li>
                      <li>Flexible circuit arrangements and modifications</li>
                      <li>Better heat dissipation in trunking systems</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Standard colour codes (BS 7671):</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Live (Line): Brown for single-phase, Brown/Black/Grey for three-phase</li>
                      <li>Neutral: Blue for all systems</li>
                      <li>Circuit Protective Conductor: Green/yellow</li>
                      <li>Control circuits: May use other colours as specified</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Installation requirement:</strong> Must be installed in appropriate containment for mechanical protection
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-1">Flexible Cables (Flex) Characteristics</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Construction features:</strong> Stranded copper conductors for flexibility and movement capability.</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Application categories:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Portable appliances: standard flexible cords for domestic equipment</li>
                      <li>Lighting pendants: pendant flex for suspended light fittings</li>
                      <li>Industrial equipment: heavy-duty flexible cables for machinery</li>
                      <li>Temporary installations: event and construction site applications</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Conductor specifications:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Class 5 stranding: very fine strands for maximum flexibility</li>
                      <li>Heat-resistant insulation: for high-temperature applications</li>
                      <li>Oil-resistant sheathing: for industrial environments</li>
                      <li>Reinforced types: additional mechanical protection where required</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Termination rule:</strong> Always use ferrules or twist strands to prevent spreading in terminals
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="cable-types-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Cable Preparation and Stripping Techniques */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Cable Preparation and Stripping Techniques</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Proper preparation is essential for reliable terminations and prevents damage to conductors:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Measuring and Cutting Procedures</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Planning approach:</strong> Measure twice, cut once to avoid waste and ensure adequate conductor length.</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Length calculations:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Allow sufficient slack for stress-free connections (minimum 150mm at accessories)</li>
                      <li>Account for cable entry point to terminal distance</li>
                      <li>Consider future maintenance access requirements</li>
                      <li>Plan for proper cable dressing within enclosures</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Cutting tools and techniques:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Sharp cable cutters for clean cuts without crushing conductors</li>
                      <li>Diagonal cutters for precise length adjustments</li>
                      <li>Cable knives for sheath removal (with safety guards)</li>
                      <li>Measuring tools: steel rules, tape measures for accuracy</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Safety note:</strong> Always cut away from the body and protect hands when using sharp tools
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Sheath and Insulation Stripping</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Twin & Earth preparation:</strong> Remove outer sheath without damaging inner conductors.</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Stripping procedures for T&E:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Score sheath lightly with knife, avoiding inner insulation</li>
                      <li>Strip 25-30mm of outer sheath for standard accessories</li>
                      <li>Remove inner insulation: 12-15mm for most terminals</li>
                      <li>Apply green/yellow sleeving to CPC before connection</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Single-core preparation:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Use automatic wire strippers matched to conductor size</li>
                      <li>Avoid nicking copper which weakens the conductor</li>
                      <li>Strip length to match terminal requirements (typically 12mm)</li>
                      <li>Ensure clean, square cuts without damaged strands</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Quality check:</strong> Inspect stripped conductors for nicks or damaged strands before terminating
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Flexible Cable Preparation Techniques</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Stranded conductor handling:</strong> Special techniques required to prevent strand separation.</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Flex preparation steps:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Strip outer sheath without cutting into inner insulation</li>
                      <li>Twist individual conductor strands together tightly</li>
                      <li>Apply ferrules to prevent strand separation in terminals</li>
                      <li>Ensure cord grip will secure the sheath, not individual conductors</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Ferrule selection and application:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Match ferrule size to conductor cross-sectional area</li>
                      <li>Use proper crimping tools for secure attachment</li>
                      <li>Verify all strands are contained within the ferrule</li>
                      <li>Check crimped connection cannot be pulled apart</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Essential tool:</strong> Proper ferrule crimping tool ensures reliable connections and compliance
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="cable-preparation-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Termination Techniques and Best Practices */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Termination Techniques and Best Practices</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Professional termination techniques ensure electrical and mechanical integrity for safe, reliable operation:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-elec-yellow mb-1">Twin & Earth Termination Procedures</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Standard termination sequence:</strong> Systematic approach ensures consistent, safe connections.</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Connection procedures:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Live conductor (brown): Connect to L terminal, ensure full insertion</li>
                      <li>Neutral conductor (blue): Connect to N terminal with secure tightening</li>
                      <li>CPC (green/yellow sleeved): Connect to earth terminal or earth bar</li>
                      <li>Verify no bare copper visible outside terminals</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Terminal tightening specifications:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Use manufacturer's specified torque settings where provided</li>
                      <li>Tighten firmly but avoid over-tightening which damages conductors</li>
                      <li>Check adjacent terminals haven't loosened during tightening</li>
                      <li>Perform gentle tug test to verify mechanical security</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Critical check:</strong> Insulation should be just inside terminal with no exposed copper
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-elec-yellow mb-1">Single-Core Cable Installation</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Routing and management:</strong> Systematic approach to conductor routing within containment systems.</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Installation procedures:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Route conductors neatly within conduit or trunking</li>
                      <li>Maintain phase sequence and colour identification</li>
                      <li>Cut to precise lengths avoiding excess slack in enclosures</li>
                      <li>Group conductors by circuit for easy identification</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Termination considerations:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Verify correct conductor identification before connection</li>
                      <li>Use temporary labelling during installation if required</li>
                      <li>Ensure earth continuity through all metallic containment</li>
                      <li>Document circuit arrangements for future reference</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Best practice:</strong> Label circuits clearly at both ends for maintenance identification
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-elec-yellow mb-1">Flexible Cable Termination with Strain Relief</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Mechanical protection:</strong> Essential to prevent strain on electrical connections.</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Ferrule application:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Select correct ferrule size for conductor cross-section</li>
                      <li>Insert twisted strands fully into ferrule sleeve</li>
                      <li>Crimp using appropriate tool to manufacturer specification</li>
                      <li>Verify all strands are secured and none protruding</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Cord grip installation:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Position grip to clamp outer sheath, not individual conductors</li>
                      <li>Tighten sufficiently to prevent cable pull-out</li>
                      <li>Avoid over-tightening which can damage cable sheath</li>
                      <li>Test cable cannot be withdrawn with reasonable force</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Safety principle:</strong> Strain relief must support cable mechanically, not electrically
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="termination-techniques-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Testing and Quality Assurance */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Testing and Quality Assurance</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Systematic testing and inspection ensure terminations meet safety and performance standards:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-elec-yellow mb-1">Mechanical Security Testing</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Tug testing procedures:</strong> Verify mechanical integrity of all terminations.</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Testing methodology:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Apply gentle pulling force to each conductor at termination</li>
                      <li>Conductor should not move or withdraw from terminal</li>
                      <li>Check terminal itself remains secure to mounting</li>
                      <li>Verify no damage to conductor or terminal during test</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Visual inspection checklist:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>No bare copper visible outside terminals</li>
                      <li>Insulation extends just inside terminal screws</li>
                      <li>No trapped insulation preventing proper contact</li>
                      <li>CPC correctly sleeved with green/yellow identification</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Acceptance criteria:</strong> Zero movement under reasonable force indicates secure termination
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-elec-yellow mb-1">Electrical Continuity and Polarity Verification</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Testing requirements:</strong> Verify electrical integrity and correct conductor identification.</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Continuity testing:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Test circuit protective conductor (CPC) continuity end-to-end</li>
                      <li>Verify low resistance path through all connections</li>
                      <li>Check earth continuity to all exposed metalwork</li>
                      <li>Measure and record resistance values for certification</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Polarity verification:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Confirm live conductors connected to correct terminals</li>
                      <li>Verify neutral conductors properly identified and connected</li>
                      <li>Check switching operates in live conductor only</li>
                      <li>Ensure no cross-connections between different circuits</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Critical safety check:</strong> Polarity errors can create dangerous conditions - verify before energising
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-elec-yellow mb-1">BS 7671 Compliance and Documentation</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Regulatory requirements:</strong> All terminations must provide mechanical and electrical security.</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Compliance verification:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Terminations suitable for environmental conditions</li>
                      <li>Appropriate IP ratings maintained for enclosures</li>
                      <li>Strain relief provided for all flexible connections</li>
                      <li>Conductor sizes appropriate for protection device ratings</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Documentation requirements:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Record test results on installation certificates</li>
                      <li>Note any deviations from standard practices</li>
                      <li>Provide circuit schedules with conductor identification</li>
                      <li>Include manufacturer specifications for special components</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Professional standard:</strong> Maintain detailed records for safety, maintenance, and compliance
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        {/* Real-world example */}
        <Card className="mb-8 p-6 border-elec-blue">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Real-world example</h2>
          <p className="text-xs sm:text-sm text-white mb-4">
            On a commercial lighting installation, flex cables were terminated without ferrules. Over time, vibration caused the fine strands to loosen, leading to arcing, intermittent faults, and damage to the terminals. Retermination with ferrules resolved the problem and improved reliability.
          </p>
          <p className="text-xs sm:text-sm text-white mb-4">
            The investigation revealed that several pendant lights had developed high-resistance connections due to strand separation in the terminals. This caused voltage drop, reduced light output, and heat generation that could have led to fire. The entire installation required inspection and retermination.
          </p>
          <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
            <p className="font-medium text-green-600 dark:text-green-400 mb-2">Lesson learned</p>
            <p className="text-sm text-green-600 dark:text-green-400">
              The rework took three days and cost significantly more than doing it correctly initially. Always use ferrules on stranded conductors and never rely on twisted strands alone. Quality termination techniques prevent expensive failures and ensure long-term reliability.
            </p>
          </div>
        </Card>

        {/* Practical guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Practical guidance</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm">
            <div>
              <h3 className="font-medium text-white mb-3">Tools and Techniques</h3>
              <ul className="space-y-2 text-white">
                <li>• Use quality cable strippers matched to conductor size to avoid nicking copper.</li>
                <li>• Always sleeve earth conductors with green/yellow before connecting to terminals.</li>
                <li>• On flex, pre-bend the conductors into position to reduce stress when tightening terminals.</li>
                <li>• In damp or outdoor environments, use IP-rated glands to protect against moisture ingress.</li>
                <li>• For lighting pendants, ensure the cord grip is tightened but not crushing the insulation.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-white mb-3">Quality and Safety</h3>
              <ul className="space-y-2 text-white">
                <li>• Keep termination neat and consistent — poor appearance often reflects poor workmanship.</li>
                <li>• Test each connection with a gentle tug before applying power to verify security.</li>
                <li>• Use proper ferrule crimping tools - hand-twisted strands are not acceptable for permanent installations.</li>
                <li>• Document any non-standard practices or special requirements for future maintenance.</li>
                <li>• Always verify polarity before energising - mistakes can be dangerous and expensive to correct.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Quick knowledge check */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Quick knowledge check</h2>
          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg border">
              <p className="font-medium text-white mb-2">Why must T&E earth conductors be sleeved before termination?</p>
              <p className="text-sm text-white">BS 7671 requires clear identification of protective conductors with green/yellow sleeving to prevent confusion and ensure safety.</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg border">
              <p className="font-medium text-white mb-2">What is the purpose of ferrules on flexible conductors?</p>
              <p className="text-sm text-white">Ferrules prevent fine strands from spreading in terminals, ensuring reliable connections and preventing loose strands.</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg border">
              <p className="font-medium text-white mb-2">How do you verify a conductor is securely terminated?</p>
              <p className="text-sm text-white">Perform a gentle tug test to confirm the conductor cannot be withdrawn from the terminal under reasonable force.</p>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">FAQs</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-white mb-2">Q: Can I use T&E cable in conduit?</h3>
              <p className="text-sm text-white">A: It's not standard practice — single-core cables are better suited for conduit installations as they're easier to pull and replace.</p>
            </div>
            <Separator />
            <div>
              <h3 className="font-medium text-white mb-2">Q: Is twisting stranded conductors always necessary?</h3>
              <p className="text-sm text-white">A: Yes, unless a ferrule is fitted — it prevents strands from spreading when inserted into the terminal and ensures reliable connection.</p>
            </div>
            <Separator />
            <div>
              <h3 className="font-medium text-white mb-2">Q: How much insulation should be stripped from a conductor?</h3>
              <p className="text-sm text-white">A: Just enough to ensure full contact with the terminal without leaving bare copper exposed — typically 12-15mm for most accessories.</p>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Summary</h2>
          <p className="text-xs sm:text-sm text-white">
            Correctly terminating Twin & Earth, single-core, and flexible cables is fundamental to electrical safety and reliability. Good terminations combine mechanical strength, electrical integrity, and compliance with BS 7671, ensuring safe operation for the lifetime of the installation. Always use appropriate preparation techniques, select correct accessories, and verify connections through proper testing.
          </p>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} title="Test your knowledge of terminating Twin & Earth, singles, and flex" />

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" asChild>
            <Link to="../5-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Installing Lighting Points and Pendants
            </Link>
          </Button>
          <Button asChild>
            <Link to="../5-4" className="flex items-center gap-2">
              Next: Using Ferrules, Sleeving, Glands, and Crimps
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module4Section5_3;