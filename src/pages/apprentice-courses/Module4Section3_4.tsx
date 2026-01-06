import { ArrowLeft, ArrowRight, Package, Target, CheckCircle, AlertTriangle, Eye, TrendingUp, Shield, Search, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Cutting, Deburring, and Preparing Conduit Ends - Module 4.3.4 | Level 2 Electrical Course";
const DESCRIPTION = "Master essential cutting, deburring, and preparation techniques for PVC and metal conduit. Learn correct tools, safety measures, and quality checks for BS 7671 compliance.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "Why is deburring essential before pulling cables?",
    options: ["To make conduit look better", "To prevent cable insulation damage", "To reduce conduit weight"],
    correctIndex: 1,
    explanation: "Deburring removes sharp edges that could cut or damage cable insulation during installation, preventing electrical faults."
  },
  {
    id: 2,
    question: "What is the correct blade TPI for cutting PVC conduit?",
    options: ["8-12 TPI", "24-32 TPI", "50+ TPI"],
    correctIndex: 1,
    explanation: "Fine-toothed blades (24-32 TPI) provide clean cuts in PVC without cracking or tearing."
  },
  {
    id: 3,
    question: "When should chamfering be applied to conduit ends?",
    options: ["Always on all conduit", "Only for solvent-weld joints", "Never required"],
    correctIndex: 1,
    explanation: "Chamfering improves fitting entry and adhesive distribution for solvent-weld joints."
  }
];

const Module4Section3_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the main risk of failing to deburr conduit?",
      options: [
        "Poor visual appearance",
        "Damaging cable insulation", 
        "Making conduit heavier"
      ],
      correctAnswer: 1,
      explanation: "Burrs create sharp edges that can nick or cut cable insulation during installation, potentially causing electrical faults."
    },
    {
      id: 2,
      question: "Which tool is best for cutting PVC conduit?",
      options: [
        "Cold chisel",
        "Rotary pipe cutter",
        "Plumber's wrench"
      ],
      correctAnswer: 1,
      explanation: "A rotary pipe cutter provides clean, square cuts in PVC conduit with minimal effort and reduced risk of cracking."
    },
    {
      id: 3,
      question: "True or False: Burrs only occur on metal conduit.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. Both PVC and metal conduit can develop burrs during cutting that must be removed to protect cables."
    },
    {
      id: 4,
      question: "Name one tool for internal deburring.",
      options: [
        "Round file or deburring tool",
        "Hammer",
        "Spirit level"
      ],
      correctAnswer: 0,
      explanation: "Round files and dedicated deburring tools are designed to smooth internal edges safely and effectively."
    },
    {
      id: 5,
      question: "Why is a chamfer applied to PVC conduit ends for solvent welds?",
      options: [
        "To make it look better",
        "To improve fit and adhesive spread",
        "To make it stronger"
      ],
      correctAnswer: 1,
      explanation: "Chamfering creates a bevelled edge that helps the conduit enter the fitting easily and allows better adhesive distribution for a stronger joint."
    },
    {
      id: 6,
      question: "What is the purpose of securing conduit before cutting?",
      options: [
        "To ensure a straight cut and prevent movement",
        "To make it look professional",
        "To save time"
      ],
      correctAnswer: 0,
      explanation: "Securing conduit prevents movement during cutting, ensuring accuracy and safety while maintaining a square cut."
    },
    {
      id: 7,
      question: "What should be checked on metal conduit threads before joining?",
      options: [
        "Colour matching",
        "Cleanliness and freedom from oil or swarf",
        "Weight"
      ],
      correctAnswer: 1,
      explanation: "Clean threads free from oil, swarf, or debris ensure proper threading and secure mechanical connections."
    },
    {
      id: 8,
      question: "Which regulation requires proper preparation of conduit to prevent cable damage?",
      options: [
        "BS 7671",
        "Highway Code",
        "Building Regulations"
      ],
      correctAnswer: 0,
      explanation: "BS 7671 (IET Wiring Regulations) requires that conduit installation protects cables from mechanical damage."
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
              Back to Section 3
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
              <Package className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 4.3.4
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Cutting, Deburring, and Preparing Conduit Ends
          </h1>
          <p className="text-white">
            Master essential cutting, deburring, and preparation techniques for PVC and metal conduit to ensure BS 7671 compliance and cable protection.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Proper cutting ensures clean, square joints and professional appearance.</li>
                <li>Deburring protects cables from damage during installation.</li>
                <li>Correct preparation prevents faults and ensures BS 7671 compliance.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Conduit material, cutting requirements, joint types.</li>
                <li><strong>Use:</strong> Correct tools, proper technique, thorough preparation.</li>
                <li><strong>Check:</strong> Square cuts, smooth edges, cable test passed.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
            <li>Select the correct cutting tools for PVC and metal conduit applications.</li>
            <li>Apply proper cutting techniques to achieve clean, square cuts.</li>
            <li>Remove burrs effectively to protect cables during installation.</li>
            <li>Prepare conduit ends correctly for different joining methods.</li>
            <li>Implement safety measures during cutting and preparation tasks.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content</h2>

          {/* Cutting Tools Selection */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Cutting Tools Selection</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              The right tool selection is critical for achieving professional results and maintaining safety:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-1">PVC Conduit Tools</p>
                    <p className="text-xs sm:text-sm text-white mb-2">Fine-toothed hacksaw (24-32 TPI), PVC conduit cutter, rotary pipe cutter, mitre box for accurate angles.</p>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Critical tip:</strong> Always support both sides of the cut to prevent cracking
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-1">Metal Conduit Tools</p>
                    <p className="text-xs sm:text-sm text-white mb-2">Hacksaw with bi-metal blade, rotary pipe cutter, band saw (high-volume), reciprocating saw with metal blade.</p>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Pro tip:</strong> Use cutting fluid to extend blade life and improve cut quality
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-1">Measurement Tools</p>
                    <p className="text-xs sm:text-sm text-white mb-2">Steel rule, engineer's square, permanent marker, measuring tape for accurate marking.</p>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Accuracy:</strong> Measure twice, cut once - mistakes are costly to rectify
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="tool-selection-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Practical Cutting Techniques */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Practical Cutting Techniques</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Proper technique ensures clean cuts and prevents material waste:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">PVC Cutting Process</p>
                    <p className="text-xs sm:text-sm text-white mb-2">Mark with permanent marker and square → Support both sides → Use steady strokes → Don't force the cut → Check square with engineer's square.</p>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Common mistakes:</strong> Rushing the cut, inadequate support, wrong blade TPI
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Metal Cutting Process</p>
                    <p className="text-xs sm:text-sm text-white mb-2">Secure in pipe vice → Apply cutting fluid → Maintain consistent angle → Rotate periodically → Remove swarf immediately.</p>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Warning:</strong> Over-tightening vice can deform conduit - use just enough pressure
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Quality Control</p>
                    <p className="text-xs sm:text-sm text-white mb-2">Check squareness with engineer's square, test-fit in coupling, ensure clean edges before proceeding.</p>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Standard:</strong> Cuts must be within 1mm of square for professional installation
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="cutting-technique-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Professional Deburring Process */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Professional Deburring Process</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Deburring is critical for cable protection and must never be skipped:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 text-elec-yellow mb-1">External Deburring</p>
                    <p className="text-xs sm:text-sm text-white mb-2">Use half-round file at 45° angle to chamfer outer edge. Run finger around edge - should be smooth to touch.</p>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Test:</strong> If it's smooth to your finger, it's safe for cables
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 text-elec-yellow mb-1">Internal Deburring</p>
                    <p className="text-xs sm:text-sm text-white mb-2">Insert round file or deburring tool, rotate to remove burrs. Visual inspection - no visible sharp edges or fragments.</p>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Tools:</strong> Round file, tapered reamer, or dedicated deburring tool
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 text-elec-yellow mb-1">Final Cable Test</p>
                    <p className="text-xs sm:text-sm text-white mb-2">Pass test cable through - should slide freely without snagging. Cable moves smoothly with no resistance points.</p>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Gold standard:</strong> If the test cable passes easily, installation cables will too
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="chamfer-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Safety Considerations */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Safety Considerations</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Personal protection and safe working practices prevent injuries:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 text-elec-yellow mb-1">Personal Protective Equipment</p>
                    <p className="text-xs sm:text-sm text-white mb-2">Safety glasses for chip protection, work gloves for sharp edges, hearing protection with power tools.</p>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Remember:</strong> Eye protection is mandatory - metal fragments can cause serious injury
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 text-elec-yellow mb-1">Safe Working Practices</p>
                    <p className="text-xs sm:text-sm text-white mb-2">Secure work at comfortable height, keep cutting area clear, never force tools - let them work.</p>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Golden rule:</strong> If you're forcing it, you're doing it wrong
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 text-elec-yellow mb-1">Tool Maintenance</p>
                    <p className="text-xs sm:text-sm text-white mb-2">Keep blades sharp, clean tools after use, store safely. Dull tools require more force and are dangerous.</p>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Efficiency:</strong> Sharp tools work faster and safer than dull ones
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Separator className="my-6" />

          {/* Quality and Compliance Checks */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Quality and Compliance Checks</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Final verification ensures professional standards and BS 7671 compliance:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 text-elec-yellow mb-1">Cut Quality Verification</p>
                    <p className="text-xs sm:text-sm text-white mb-2">Check cuts are square and true, clean edges without damage, correct length as measured.</p>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Standard:</strong> Cuts must fit neatly into couplings without gaps
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 text-elec-yellow mb-1">Preparation Standards</p>
                    <p className="text-xs sm:text-sm text-white mb-2">Metal threads clean and free from swarf, chamfer applied where required, all debris removed.</p>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>BS 7671:</strong> Installation must protect cables from mechanical damage
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 text-elec-yellow mb-1">Final Documentation</p>
                    <p className="text-xs sm:text-sm text-white mb-2">Record preparation methods used, note any non-standard procedures, maintain quality logs.</p>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Traceability:</strong> Document your work for quality assurance and fault diagnosis
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        {/* Real-world example */}
        <Card className="mb-8 p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Real-world example</h2>
          <p className="text-xs sm:text-sm text-white mb-4">
            On a commercial lighting job, an installer rushed the conduit preparation and skipped deburring. 
            When cables were pulled, the insulation was nicked on a sharp edge, causing a fault during testing. 
            The conduit had to be dismantled, deburred, and re-pulled, costing an entire day of labour.
          </p>
          <div className="rounded-lg p-4 bg-gradient-to-r from-green-50 to-elec-yellow/5 border-l-4 border-green-500">
            <p className="font-medium text-green-800 mb-1">Lesson learned:</p>
            <p className="text-sm text-green-700">
              Proper preparation saves time and prevents costly rework. Always deburr thoroughly - 
              the few extra minutes spent ensure cable integrity and installation success.
            </p>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-8 p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium text-white mb-1">Q: Can I use an angle grinder to cut conduit?</p>
              <p className="text-white">A: It's possible, but only with caution, correct PPE, and the right disc — however, it's generally not preferred due to safety risks and potential for rough cuts.</p>
            </div>
            <Separator />
            <div>
              <p className="font-medium text-white mb-1">Q: Do all conduit types require deburring?</p>
              <p className="text-white">A: Yes — whether PVC or metal, sharp edges can damage cables during installation.</p>
            </div>
            <Separator />
            <div>
              <p className="font-medium text-white mb-1">Q: Is a chamfer always necessary on PVC conduit?</p>
              <p className="text-white">A: Only if solvent-welded joints are being used or where a better entry is needed for cables.</p>
            </div>
            <Separator />
            <div>
              <p className="font-medium text-white mb-1">Q: What's the best way to test if deburring is complete?</p>
              <p className="text-white">A: Pass a test cable through the conduit - it should slide freely without any snagging or resistance points.</p>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Summary</h2>
          <p className="text-xs sm:text-sm text-white">
            Cutting, deburring, and preparing conduit ends is essential for safety, compliance, and ease of installation. 
            Correct tools, clean cuts, and smooth edges protect cables, ensure secure joints, and maintain a professional 
            standard of work. Never rush these critical preparation steps - proper preparation prevents problems and ensures 
            successful cable installation that meets BS 7671 requirements.
          </p>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} title="Test Your Knowledge" />

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8">
          <Button variant="outline" asChild>
            <Link to="../3-3" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Manual Bending Tools
            </Link>
          </Button>
          <Button asChild>
            <Link to="../3-5" className="flex items-center gap-2">
              Joining Methods
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module4Section3_4;