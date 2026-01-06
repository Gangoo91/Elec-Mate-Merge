import { ArrowLeft, ArrowRight, Anchor, Target, CheckCircle, AlertTriangle, Eye, TrendingUp, Shield, Search, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Fixing and Supporting Containment Systems - Module 4.4.1 | Level 2 Electrical Course";
const DESCRIPTION = "Master fixing and supporting techniques for conduit, trunking, and cable trays. Learn proper spacing, load calculations, and BS 7671 compliance for secure installations.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "Why is it essential to follow manufacturer spacing guidelines for containment supports?",
    options: ["To save materials", "To prevent sagging and maintain load capacity", "To make installation faster"],
    correctIndex: 1,
    explanation: "Correct spacing prevents sagging, maintains structural integrity, and ensures the containment can safely carry its intended load without failure."
  },
  {
    id: 2,
    question: "What is the maximum recommended saddle spacing for horizontal PVC conduit?",
    options: ["2.5m", "1.2m", "3.0m"],
    correctIndex: 1,
    explanation: "PVC conduit requires closer spacing (1.2m max) due to its flexibility and thermal expansion properties compared to steel conduit."
  },
  {
    id: 3,
    question: "Which fixing type is most suitable for heavy loads in concrete ceilings?",
    options: ["Wall plugs", "Drop-in anchors", "Self-tapping screws"],
    correctIndex: 1,
    explanation: "Drop-in anchors provide the highest load capacity and most secure fixing for heavy containment systems in concrete substrates."
  }
];

const Module4Section4_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the typical maximum saddle spacing for horizontal steel conduit?",
      options: [
        "1.2 m",
        "2.5 m",
        "3.0 m"
      ],
      correctAnswer: 1,
      explanation: "Steel conduit can be supported at 2.5m intervals due to its structural strength and rigidity compared to PVC."
    },
    {
      id: 2,
      question: "Which fixing is most suitable for securing to concrete ceilings for heavy loads?",
      options: [
        "Wood screws",
        "Drop-in anchors", 
        "Hollow wall anchors"
      ],
      correctAnswer: 1,
      explanation: "Drop-in anchors provide the highest load capacity and most secure connection to concrete substrates."
    },
    {
      id: 3,
      question: "True or False: It's acceptable to drill into a surface without checking for hidden services if you're confident in the layout.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. Always use detection equipment to check for hidden services - confidence in layout is not sufficient for safety."
    },
    {
      id: 4,
      question: "What type of fixing is best for damp environments?",
      options: [
        "Standard steel fixings",
        "Stainless steel or galvanised fixings",
        "Plastic fixings only"
      ],
      correctAnswer: 1,
      explanation: "Stainless steel or galvanised fixings resist corrosion in damp conditions, ensuring long-term installation integrity."
    },
    {
      id: 5,
      question: "Why is PVC conduit spaced closer than steel conduit?",
      options: [
        "PVC is heavier",
        "PVC is more flexible and sags more easily",
        "PVC is cheaper"
      ],
      correctAnswer: 1,
      explanation: "PVC's flexibility means it requires closer support spacing to prevent sagging and maintain proper cable protection."
    },
    {
      id: 6,
      question: "Name two common fixing mistakes.",
      options: [
        "Over-tightening and using wrong fixing type",
        "Under-tightening and correct spacing",
        "Proper marking and level installation"
      ],
      correctAnswer: 0,
      explanation: "Over-tightening can deform containment, while wrong fixing types may not provide adequate support or fail under load."
    },
    {
      id: 7,
      question: "What extra consideration should be made when working near vibrating equipment?",
      options: [
        "Use standard fixings",
        "Use vibration-resistant fixings and locking nuts",
        "Increase spacing between supports"
      ],
      correctAnswer: 1,
      explanation: "Vibration can loosen standard fixings over time, so vibration-resistant fixings and locking nuts prevent failure."
    },
    {
      id: 8,
      question: "Why should supports be added near bends and junctions?",
      options: [
        "To look more professional",
        "To provide extra strength and prevent sagging or movement",
        "To use more materials"
      ],
      correctAnswer: 1,
      explanation: "Bends and junctions create stress concentration points requiring additional support to maintain structural integrity."
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
              Back to Section 4
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
              <Anchor className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 4.4.1
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Fixing and Supporting Containment Systems
          </h1>
          <p className="text-white">
            Master the principles of secure fixing and supporting for conduit, trunking, and cable trays to ensure safe, compliant, and durable installations.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Proper fixing prevents sagging, vibration damage, and cable stress.</li>
                <li>Correct spacing maintains structural integrity over time.</li>
                <li>Right fixing selection ensures BS 7671 compliance and safety.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Substrate type, load requirements, environmental conditions.</li>
                <li><strong>Use:</strong> Correct fixings, proper spacing, appropriate tools.</li>
                <li><strong>Check:</strong> Level installation, secure fixings, no sagging.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
            <li>Identify correct fixings and supports for different containment systems and substrates.</li>
            <li>Apply manufacturer guidelines and BS 7671 spacing requirements effectively.</li>
            <li>Select appropriate fixing methods for various wall, ceiling, and floor materials.</li>
            <li>Install containment systems that are secure, aligned, and load-compliant.</li>
            <li>Recognise and prevent common fixing faults and installation errors.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content</h2>

          {/* Fixing Selection and Substrate Assessment */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Fixing Selection and Substrate Assessment</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Correct fixing selection is critical for safe, secure, and long-lasting containment installations:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-1">Masonry and Blockwork Fixings</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Primary choice:</strong> Wall plugs (brown for masonry, grey for dense block) with corrosion-resistant screws.</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Load capacity:</strong> 8mm plugs = 25kg, 10mm plugs = 40kg, 12mm plugs = 60kg per fixing point.</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Installation process:</strong></p>
                    <ol className="text-xs text-white ml-4 mb-2 list-decimal space-y-1">
                      <li>Drill hole to exact plug diameter using masonry bit</li>
                      <li>Clear debris with blow-out pump or vacuum</li>
                      <li>Insert plug fully flush with surface</li>
                      <li>Drive screw leaving 5-8mm for bracket engagement</li>
                    </ol>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Critical tip:</strong> Always use hammer drill setting for consistent hole quality in masonry
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-1">Concrete and Heavy-Duty Applications</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Drop-in anchors:</strong> M8 = 500kg, M10 = 800kg, M12 = 1200kg safe working load.</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Chemical anchors:</strong> For highest loads and critical applications (up to 2000kg per point).</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Installation considerations:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Minimum concrete strength: C20/25 for standard anchors</li>
                      <li>Edge distance: minimum 5 × anchor diameter</li>
                      <li>Spacing: minimum 10 × anchor diameter between fixings</li>
                      <li>Embedment depth: 8-12 × anchor diameter depending on load</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Safety factor:</strong> Always apply 4:1 safety factor to manufacturer's ultimate load rating
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-1">Hollow Walls and Special Substrates</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Plasterboard:</strong> Spring toggles (25kg), metal cavity fixings (15kg), or find studs for screw fixing (40kg+).</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Steel framework:</strong> Self-drilling screws with EPDM washers, M6-M8 for light loads, M10-M12 for heavy.</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Timber substrates:</strong> Coach screws minimum 50mm penetration, pilot holes at 80% thread diameter.</p>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Hollow wall rule:</strong> Maximum 3 fixing points per standard stud spacing (400-600mm)
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-1">Environmental and Corrosion Considerations</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Damp locations:</strong> Marine-grade stainless steel (316L) or hot-dip galvanised to BS EN ISO 1461.</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>External installations:</strong> A4 stainless steel minimum, with appropriate gaskets and sealing.</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Corrosion protection grades:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Standard internal: Zinc-plated steel (12μm minimum coating)</li>
                      <li>Damp internal: A2 stainless steel or 42μm galvanising</li>
                      <li>External/aggressive: A4 stainless steel or marine coating systems</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Cost vs benefit:</strong> Premium fixings cost 20% more but prevent 90% of corrosion failures
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="fixing-selection-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Support Systems and Spacing Requirements */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Support Systems and Spacing Requirements</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Proper support design and spacing is crucial for maintaining containment integrity and preventing failures:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Conduit Support Specifications</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Steel conduit spacing:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Horizontal runs: 2.5m maximum, 2.0m preferred for professional appearance</li>
                      <li>Vertical runs: 3.0m maximum with clips at each floor level</li>
                      <li>Additional supports: 300mm from bends, 150mm from junction boxes</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>PVC conduit spacing (more flexible):</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Horizontal: 1.2m maximum (1.0m in hot environments &gt;30°C)</li>
                      <li>Vertical: 1.5m maximum with expansion couplings every 6m</li>
                      <li>Temperature compensation: reduce spacing by 20% for each 10°C above 20°C</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Thermal expansion:</strong> PVC expands 0.6mm per metre per 10°C temperature rise
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Cable Tray and Basket Systems</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Standard spacing guidelines:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Light duty (&lt;25kg/m): 2.0m spacing maximum</li>
                      <li>Medium duty (25-50kg/m): 1.5m spacing standard</li>
                      <li>Heavy duty (&gt;50kg/m): 1.0m spacing or engineered supports</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Support calculation method:</strong></p>
                    <ol className="text-xs text-white ml-4 mb-2 list-decimal space-y-1">
                      <li>Calculate tray self-weight (kg/m from manufacturer data)</li>
                      <li>Add cable load (estimate 3-5kg per 100mm tray width when full)</li>
                      <li>Apply 1.5 safety factor for dynamic loads</li>
                      <li>Check support deflection &lt;span/200 (typically &lt;10mm per 2m span)</li>
                    </ol>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Deflection limit:</strong> Maximum sag = span length ÷ 200 for professional installations
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Trunking Support Requirements</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Metal trunking:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Standard sections: 1.5m spacing for sizes up to 100×50mm</li>
                      <li>Large sections (&gt;150mm): 1.2m spacing or engineer design</li>
                      <li>Vertical runs: support at each floor level plus intermediate supports</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>PVC trunking:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>All sizes: 1.0m maximum spacing due to flexibility</li>
                      <li>High-temperature areas: 0.8m spacing (&gt;25°C ambient)</li>
                      <li>Use expansion couplings for runs &gt;10m in length</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Joint loads:</strong> Additional supports within 100mm of all joints and terminations
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Specialised Support Systems</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Cantilever bracket systems:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Wall bracket depth: minimum 200mm for 500mm projection</li>
                      <li>Maximum safe projection: 4:1 ratio (bracket depth : projection)</li>
                      <li>Vertical loading: consider both dead load and installation forces</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Trapeze hanger systems:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Rod sizing: M10 minimum for loads up to 250kg per point</li>
                      <li>Span limits: 2.5m maximum between ceiling fixing points</li>
                      <li>Seismic areas: additional diagonal bracing required</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Dynamic factor:</strong> Add 50% to static loads for areas with moving equipment or wind exposure
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="spacing-requirements-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Installation Techniques and Quality Control */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Installation Techniques and Quality Control</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Professional installation techniques ensure accuracy, safety, and long-term reliability:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 text-elec-yellow mb-1">Pre-Installation Planning and Marking</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Service detection protocol:</strong></p>
                    <ol className="text-xs text-white ml-4 mb-2 list-decimal space-y-1">
                      <li>Use CAT scanner for electrical services (power off if possible)</li>
                      <li>Check for water pipes with acoustic detector</li>
                      <li>Scan for gas pipes with specialist detector</li>
                      <li>Mark all detected services before drilling</li>
                      <li>Cross-reference with building services drawings if available</li>
                    </ol>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Accurate marking techniques:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Use laser level for runs &gt;5m to maintain alignment</li>
                      <li>Chalk line for shorter runs and marking multiple points</li>
                      <li>Centre punch all drilling points to prevent bit wander</li>
                      <li>Use paper template for repetitive bracket patterns</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Professional standard:</strong> ±3mm tolerance over 10m run length for visual acceptability
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 text-elec-yellow mb-1">Drilling and Fixing Installation Process</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Drilling best practices:</strong></p>
                    <ol className="text-xs text-white ml-4 mb-2 list-decimal space-y-1">
                      <li>Start with slow speed to establish hole position</li>
                      <li>Increase to full speed once hole is established</li>
                      <li>Withdraw drill periodically to clear debris</li>
                      <li>Use blow-out pump or vacuum to clean hole completely</li>
                      <li>Check hole depth with depth gauge or marked drill bit</li>
                    </ol>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Quality installation checks:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Fixing flush with substrate surface (not sunken or proud)</li>
                      <li>Correct torque applied - tight but not over-tightened</li>
                      <li>No damage to containment during installation</li>
                      <li>Bracket level and plumb checked with spirit level</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Torque guide:</strong> M8 fixings = 15Nm, M10 = 25Nm, M12 = 40Nm (adjust for substrate)
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 text-elec-yellow mb-1">Heavy Section Installation Techniques</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Team lifting procedures:</strong></p>
                    <ol className="text-xs text-white ml-4 mb-2 list-decimal space-y-1">
                      <li>Pre-fit all brackets and check alignment before lifting</li>
                      <li>Use minimum 2-person lift for sections &gt;3m or &gt;10kg</li>
                      <li>Support intermediate points to prevent bending</li>
                      <li>Coordinate lifting with clear verbal commands</li>
                      <li>Secure each end before releasing manual support</li>
                    </ol>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Temporary support strategies:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Use adjustable props for ceiling installations</li>
                      <li>Clamp temporary brackets for alignment checking</li>
                      <li>Install alternate fixings first, then intermediate supports</li>
                      <li>Never rely on cable ties for temporary support of heavy items</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Safety limit:</strong> Never attempt single-person installation of items &gt;15kg or &gt;2m long
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="installation-techniques-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Common Faults and Troubleshooting */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Common Faults and Prevention Strategies</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Understanding and preventing common fixing faults saves time, materials, and ensures installation integrity:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 text-elec-yellow mb-1">Over-Tightening and Deformation Issues</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Symptoms and causes:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Crushed PVC conduit from excessive clamp pressure</li>
                      <li>Distorted metal trunking from over-tight bracket screws</li>
                      <li>Stress cracking around mounting holes</li>
                      <li>Reduced internal space affecting cable capacity</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Prevention and correction:</strong></p>
                    <ol className="text-xs text-white ml-4 mb-2 list-decimal space-y-1">
                      <li>Use torque wrench for consistent, controlled tightening</li>
                      <li>Apply PTFE tape to threads to reduce friction and prevent seizing</li>
                      <li>Check containment profile after each fixing installation</li>
                      <li>Replace damaged sections immediately - don't compromise on quality</li>
                    </ol>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Rule of thumb:</strong> "Snug plus 1/4 turn" for plastic substrates, "firm resistance" for metal
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 text-elec-yellow mb-1">Inappropriate Fixing Selection</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Common mismatches and consequences:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Wall plugs in hollow blocks - inadequate grip, eventual failure</li>
                      <li>Standard screws in damp areas - corrosion and joint failure</li>
                      <li>Under-rated fixings for load - gradual loosening and sagging</li>
                      <li>Wrong drill bit size - loose fit or plug damage</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Selection verification process:</strong></p>
                    <ol className="text-xs text-white ml-4 mb-2 list-decimal space-y-1">
                      <li>Test substrate with small sample hole</li>
                      <li>Calculate total load including safety factors</li>
                      <li>Verify environmental conditions and corrosion risk</li>
                      <li>Cross-check manufacturer's load tables</li>
                      <li>Confirm fixing length provides adequate engagement</li>
                    </ol>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Load verification:</strong> Test installations should survive 150% of intended working load
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 text-elec-yellow mb-1">Spacing and Alignment Errors</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Insufficient spacing problems:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Visible sagging between support points</li>
                      <li>Excessive stress on fixings leading to premature failure</li>
                      <li>Difficulty in cable installation due to containment deformation</li>
                      <li>Non-compliance with BS 7671 and manufacturer specifications</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Alignment issues and solutions:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Twisted runs: Use string line reference and adjust bracket angles</li>
                      <li>Height variations: Re-establish datum line and adjust mounting points</li>
                      <li>Poor junction alignment: Install additional supports at change points</li>
                      <li>Thermal movement restrictions: Allow expansion gaps at building joints</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Retrofit rule:</strong> Adding extra supports is easier than correcting failed installations
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 text-elec-yellow mb-1">Vibration and Dynamic Load Issues</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Vibration-related failures:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Gradual loosening of standard fixings near machinery</li>
                      <li>Fatigue cracking at mounting points</li>
                      <li>Resonance amplification causing noise and wear</li>
                      <li>Accelerated corrosion from vibration-induced fretting</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Anti-vibration solutions:</strong></p>
                    <ol className="text-xs text-white ml-4 mb-2 list-decimal space-y-1">
                      <li>Use vibration-resistant fixings (spring washers, thread-locking compounds)</li>
                      <li>Install vibration dampers between containment and structure</li>
                      <li>Increase fixing frequency in high-vibration areas</li>
                      <li>Use flexible connections at equipment interfaces</li>
                      <li>Implement regular inspection schedules for dynamic environments</li>
                    </ol>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Inspection frequency:</strong> Monthly checks near machinery, quarterly elsewhere
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
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <p>
              During an industrial installation, a contractor installed cable tray supports every 3 metres instead of the specified 1.5 metres to save on materials and installation time. The tray was initially acceptable when empty, but once loaded with the full complement of power and control cables (approximately 45kg per metre), significant sagging occurred.
            </p>
            <p>
              The sagging caused cables to compress against each other, damaging insulation and creating potential fire risks. During the electrical inspection, the installation failed due to visible deformation and non-compliance with manufacturer specifications. The contractor had to remove all cables, install additional intermediate supports, and re-install the cable system.
            </p>
            <p>
              The rework cost included 3 days additional labour, new support materials, and project delay penalties. The total additional cost was over £8,000 - far exceeding the original £300 saving from reducing support points.
            </p>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/30">
              <p className="font-medium mb-2">Lesson learned</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Always follow manufacturer spacing guidelines - they account for full load conditions</li>
                <li>Factor in the complete cable load during support design, not just tray weight</li>
                <li>False economy on supports often results in much higher remedial costs</li>
                <li>Pre-loading calculations prevent expensive post-installation failures</li>
                <li>Quality installations require investment in proper support infrastructure</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-8 p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">FAQs</h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <div>
              <p className="font-medium mb-2">Q: Can I mix different types of fixings on the same installation run?</p>
              <p>A: Yes, it's acceptable to use different fixing types to suit varying substrate conditions along a run. However, ensure each fixing type meets the load requirements and maintain consistent support spacing. Document the fixing types used for future maintenance reference.</p>
            </div>
            <Separator />
            <div>
              <p className="font-medium mb-2">Q: How do I determine the safe working load of a fixing without manufacturer data?</p>
              <p>A: Never guess at load ratings. Contact the manufacturer or supplier for technical data sheets. If unavailable, use pull-out testing with a calibrated force gauge, applying a 4:1 safety factor to the failure load. For critical applications, consider upgrading to a known-rated fixing system.</p>
            </div>
            <Separator />
            <div>
              <p className="font-medium mb-2">Q: Should containment supports be installed level or follow the building slope?</p>
              <p>A: Supports should be installed level unless the design specifically requires a slope for drainage or other technical reasons. Level installation ensures even load distribution and professional appearance. Use a spirit level on each support point during installation.</p>
            </div>
            <Separator />
            <div>
              <p className="font-medium mb-2">Q: What's the best way to handle thermal expansion in long PVC runs?</p>
              <p>A: Install expansion joints every 6-10 metres, use sliding bracket arrangements at intermediate supports, and ensure fixed points are only at the ends. Allow 0.6mm expansion per metre per 10°C temperature rise. Plan expansion accommodation during design phase to avoid retrofitting issues.</p>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Summary</h2>
          <div className="text-xs sm:text-sm text-white space-y-2">
            <p>
              Proper fixing and supporting of containment systems is fundamental to electrical installation safety, compliance, and longevity. The correct selection of fixings based on substrate type, load requirements, and environmental conditions ensures reliable performance throughout the installation's life.
            </p>
            <p>
              Adherence to manufacturer spacing guidelines and BS 7671 requirements prevents sagging, stress concentration, and premature failure. Quality installation techniques, including proper marking, drilling, and torque application, deliver professional results that meet inspection requirements and client expectations.
            </p>
            <p>
              Understanding common faults and prevention strategies enables proactive quality control, reducing costly remedial work and ensuring first-time compliance with electrical standards and building regulations.
            </p>
          </div>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} />

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button variant="outline" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 4
            </Link>
          </Button>
          <Button asChild>
            <Link to="../4-2">
              Next: Cable Installation Methods
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module4Section4_1;