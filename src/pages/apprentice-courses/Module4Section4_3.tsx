import { ArrowLeft, ArrowRight, Wrench, Target, CheckCircle, AlertTriangle, Eye, TrendingUp, Shield, Search, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Assembling and Joining Containment - Module 4.4.3 | Level 2 Electrical Course";
const DESCRIPTION = "Master the use of couplers, saddles, and bushes for containment assembly. Learn proper joining techniques, electrical continuity, and BS 7671 compliance for safe installations.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What is the main purpose of a bush when fitted to conduit ends?",
    options: ["To join conduit sections", "To protect cables from sharp edges", "To support conduit runs"],
    correctIndex: 1,
    explanation: "Bushes are fitted to conduit ends to protect cables from sharp edges and prevent insulation damage, as required by BS 7671."
  },
  {
    id: 2,
    question: "Why must metallic conduit joints maintain electrical continuity?",
    options: ["For aesthetic purposes", "To act as protective conductor (CPC)", "To prevent thermal expansion"],
    correctIndex: 1,
    explanation: "Metallic containment may be used as a protective conductor (CPC), so electrical continuity must be maintained throughout the installation."
  },
  {
    id: 3,
    question: "What torque consideration applies when fitting saddles to PVC conduit?",
    options: ["Over-tightening can deform PVC", "Maximum torque for strength", "No torque limits apply"],
    correctIndex: 0,
    explanation: "Excessive torque on saddles can deform PVC conduit and create stress points. Follow manufacturer's torque specifications."
  }
];

const Module4Section4_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the function of a coupler?",
      options: [
        "To support conduit",
        "To join two sections of containment", 
        "To protect cables from sharp edges",
        "To align saddles"
      ],
      correctAnswer: 1,
      explanation: "Couplers are specifically designed to join two sections of containment together, ensuring mechanical strength and continuity."
    },
    {
      id: 2,
      question: "True or False: Bushes are only required for steel conduit.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. BS 7671 requires protection at cable entry points regardless of conduit material - bushes are required for both steel and PVC conduit."
    },
    {
      id: 3,
      question: "Which accessory is used to secure conduit to a wall?",
      options: ["Coupler", "Bush", "Saddle", "Gland"],
      correctAnswer: 2,
      explanation: "Saddles are used to support and secure conduit or trunking to a surface such as a wall or ceiling."
    },
    {
      id: 4,
      question: "Why is deburring important before fitting a coupler?",
      options: [
        "For aesthetics only",
        "To prevent cable damage and ensure proper fit",
        "It's not necessary",
        "To reduce costs"
      ],
      correctAnswer: 1,
      explanation: "Deburring removes sharp edges that could damage cables and ensures the coupler fits properly without interference."
    },
    {
      id: 5,
      question: "What should you do if two pieces of steel conduit don't make good electrical contact?",
      options: [
        "Ignore it",
        "Clean the surfaces or fit an earth strap",
        "Use PVC instead",
        "Add more saddles"
      ],
      correctAnswer: 1,
      explanation: "Clean contact surfaces or use earth straps to maintain electrical continuity where paint or coatings interfere."
    },
    {
      id: 6,
      question: "Name one situation where corrosion-resistant saddles are necessary.",
      options: [
        "Indoor dry locations",
        "Outdoor or damp environments",
        "Computer rooms",
        "Domestic installations"
      ],
      correctAnswer: 1,
      explanation: "Outdoor or damp environments require corrosion-resistant saddles to maintain structural integrity over time."
    },
    {
      id: 7,
      question: "What is the risk of missing bushes at cable entry points?",
      options: [
        "No risk",
        "Cable insulation damage leading to faults",
        "Reduced capacity",
        "Poor aesthetics"
      ],
      correctAnswer: 1,
      explanation: "Without bushes, sharp edges can cut into cable insulation, causing short circuits and potentially dangerous faults."
    },
    {
      id: 8,
      question: "Why is alignment important when joining containment?",
      options: [
        "For cost reduction",
        "Prevents strain on cables and ensures compliance",
        "Reduces installation time",
        "Improves colour matching"
      ],
      correctAnswer: 1,
      explanation: "Proper alignment prevents strain on cables and ensures a neat, compliant installation that meets BS 7671 requirements."
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
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 4.4.3
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Assembling and Joining Containment
          </h1>
          <p className="text-white">
            Master the use of couplers, saddles, and bushes for safe containment assembly, maintaining mechanical strength and electrical continuity.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Couplers, saddles, and bushes ensure safe containment assembly.</li>
                <li>Correct joining maintains mechanical strength and electrical continuity.</li>
                <li>Poor assembly leads to cable damage and failed inspections.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Cut containment ends, joining points, cable entry points.</li>
                <li><strong>Use:</strong> Manufacturer datasheets, torque specifications, continuity tester.</li>
                <li><strong>Check:</strong> Bush protection, proper alignment, electrical continuity.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
            <li>Identify different containment fittings (couplers, saddles, bushes) and their specific functions.</li>
            <li>Correctly select and install appropriate fittings for different containment types and materials.</li>
            <li>Ensure joints maintain mechanical strength and electrical continuity as required by BS 7671.</li>
            <li>Apply proper assembly sequence to prevent cable damage and ensure professional installation.</li>
            <li>Avoid common assembly mistakes that compromise safety and regulatory compliance.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content</h2>

          {/* Couplers and Basic Assembly */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Couplers and Basic Assembly Principles</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Couplers are essential for joining containment sections and must ensure both mechanical strength and electrical continuity:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-1">Coupler Types and Applications</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Steel conduit couplers:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Compression type: 15-25Nm torque, no thread compound required</li>
                      <li>Set screw type: M6 screws, 8-12Nm torque on conduit surface</li>
                      <li>Running thread: full thread engagement, PTFE tape for sealing</li>
                      <li>Quick-connect: push-fit with locking collar, 500N pull-out force</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>PVC conduit joining methods:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Solvent weld: 40mm overlap minimum, 24hr cure time</li>
                      <li>Push-fit with seals: 20mm insertion depth, visual marking</li>
                      <li>Expansion couplers: allow 5mm movement per 10°C change</li>
                      <li>Flexible couplers: accommodate 15° angular movement</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Critical requirement:</strong> All couplers must maintain IP rating of containment system
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-1">Assembly Sequence and Preparation</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Pre-assembly requirements:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Cut to precise length: ±2mm tolerance for professional fit</li>
                      <li>Deburr all edges: remove burrs to 0.1mm radius maximum</li>
                      <li>Clean surfaces: remove oil, paint chips, metal filings</li>
                      <li>Inspect for damage: reject bent, cracked, or oversized sections</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Critical alignment procedures:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Use laser level for runs over 10m length</li>
                      <li>Template jigs for multiple parallel runs</li>
                      <li>Check alignment before final tightening</li>
                      <li>Maximum 2mm deviation per metre allowed</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Professional tip:</strong> Mark conduit orientation before cutting to maintain consistent alignment
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-1">Tray and Trunking Joining Systems</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Cable tray couplers:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Flange-to-flange: M8 bolts, 25Nm torque, spring washers</li>
                      <li>Fishplate joiners: 50mm overlap, 4-bolt minimum fixing</li>
                      <li>Sliding joiners: for thermal expansion, 20mm movement range</li>
                      <li>Reducer couplers: gradual size change over 300mm minimum</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Trunking assembly methods:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Clip-together: audible click confirmation, 200N retention</li>
                      <li>Screw-fix lids: M4 screws every 200mm centres</li>
                      <li>Gasket seals: IP54 rating minimum for damp locations</li>
                      <li>Earth continuity: &lt;0.1Ω resistance through joints</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Load consideration:</strong> Reduce coupler spacing by 25% for fully loaded tray systems
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="couplers-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Saddles and Support Systems */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Saddles and Support Systems</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Saddles provide critical support and must be correctly specified for load, material, and environmental conditions:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Saddle Types and Load Ratings</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Fixed saddles specifications:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Standard duty: 25kg load rating, M8 wall fixing minimum</li>
                      <li>Heavy duty: 50kg load rating, M10 chemical anchor fixing</li>
                      <li>Extra heavy: 100kg+ rating, through-bolt fixing required</li>
                      <li>Spacer saddles: 10-50mm standoff, maintain ventilation gap</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Adjustable saddle features:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Size range: 20-32mm adjustable aperture typical</li>
                      <li>Rubber liner: prevents galvanic corrosion on dissimilar metals</li>
                      <li>Locking mechanism: prevents loosening under vibration</li>
                      <li>Rotation capability: ±15° angular adjustment</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Safety factor:</strong> Select saddles rated at 150% of maximum anticipated load
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Material Compatibility and Environmental Factors</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>PVC containment saddles:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Thermal expansion: 0.07mm/m/°C coefficient matching</li>
                      <li>UV stabilised: minimum 10-year outdoor warranty</li>
                      <li>Torque limits: 5-8Nm maximum to prevent deformation</li>
                      <li>Insulation properties: maintain 500V test voltage rating</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Metal containment considerations:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Galvanised steel: minimum 85μm coating thickness</li>
                      <li>Stainless steel: grade 316 for marine/chemical environments</li>
                      <li>Earthing continuity: &lt;0.1Ω through saddle to mounting</li>
                      <li>Bi-metallic protection: nylon washers prevent galvanic corrosion</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Environmental rating:</strong> IP65 minimum for outdoor saddle assemblies
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Installation Procedures and Spacing Requirements</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Saddle positioning guidelines:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Standard spacing: per manufacturer's load/span charts</li>
                      <li>Junction proximity: within 300mm of all junction boxes</li>
                      <li>Change of direction: both sides of bends and tees</li>
                      <li>Vertical runs: every floor level plus intermediate supports</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>High-vibration environments:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Reduce spacing by 50% near machinery and plant</li>
                      <li>Anti-vibration mounts: isolate from structural vibration</li>
                      <li>Lock-nuts: prevent loosening under dynamic loads</li>
                      <li>Regular inspection: monthly checks recommended</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Quality check:</strong> No visible deflection when fully loaded and stressed
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="saddles-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Bushes and Cable Protection */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Bushes and Cable Protection</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Bushes are mandatory for cable protection and must be correctly specified for containment type and application:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 text-elec-yellow mb-1">Bush Types and BS 7671 Requirements</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Regulatory compliance:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>BS 7671 Section 522: protection required at all cable entry points</li>
                      <li>Minimum bend radius: 4x cable diameter maintained</li>
                      <li>Edge radius: &gt;2mm on all cable contact surfaces</li>
                      <li>Material compatibility: no adverse chemical reaction with cable</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Bush material specifications:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>PVC bushes: for PVC conduit, UV stabilised, -20°C to +60°C rating</li>
                      <li>Nylon bushes: high strength, -40°C to +85°C, chemical resistant</li>
                      <li>Brass bushes: steel conduit, earthed installations, marine grade</li>
                      <li>Rubber grommets: flexible entries, IP65 sealing capability</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Critical requirement:</strong> Bush must be fitted before cable installation to prevent damage
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 text-elec-yellow mb-1">Installation Techniques and Sizing</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Sizing criteria:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Bush bore: 25% larger than cable bundle diameter</li>
                      <li>Entry taper: 45° minimum for easy cable insertion</li>
                      <li>Retention method: snap-fit, threaded, or push-fit types</li>
                      <li>Multiple cables: individual protection or oversized bush</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Special application requirements:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Fire barriers: intumescent bushes expand when heated</li>
                      <li>Hazardous areas: certified Ex rating for explosive atmospheres</li>
                      <li>Data cables: EMC screened bushes maintain integrity</li>
                      <li>Wall penetrations: both sides protection mandatory</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Quality indicator:</strong> No visible cable indentation or stress points at bush interface
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="bushes-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Electrical Continuity and Professional Assembly */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Electrical Continuity and Professional Assembly</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Maintaining electrical continuity and professional assembly standards ensures safety and regulatory compliance:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 text-elec-yellow mb-1">Electrical Continuity Testing and Maintenance</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Testing requirements (BS 7671):</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Continuity test: &lt;0.1Ω resistance between any two points</li>
                      <li>Test current: minimum 200mA for accurate measurement</li>
                      <li>Joint cleaning: wire brush to bright metal before assembly</li>
                      <li>Contact grease: prevent oxidation on outdoor joints</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Earth strap installations:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>4.0mm² minimum cross-sectional area for CPC duty</li>
                      <li>Mechanical protection where damage risk exists</li>
                      <li>Star washers: ensure positive electrical contact</li>
                      <li>Identification: green/yellow sleeving required</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Paint removal:</strong> 25mm minimum area around electrical contact points
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 text-elec-yellow mb-1">Professional Assembly Standards and Common Errors</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Assembly sequence checklist:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Measure and cut accurately: ±2mm tolerance maximum</li>
                      <li>Deburr and clean: file smooth, remove debris</li>
                      <li>Test fit components: before final assembly</li>
                      <li>Install bushes first: before cable pulling commences</li>
                      <li>Align and secure: check straightness before tightening</li>
                      <li>Test continuity: verify electrical path integrity</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Critical errors to avoid:</strong></p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Forcing damaged fittings: replace rather than compromise</li>
                      <li>Mixed manufacturer components: compatibility not guaranteed</li>
                      <li>Over-torquing plastic: follow manufacturer specifications</li>
                      <li>Missing earth straps: where paint interrupts continuity</li>
                      <li>Inadequate support: at changes of direction</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Professional standard:</strong> All joints should appear factory-made when complete
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
          <div className="text-xs sm:text-sm text-white mb-4">
            In a warehouse installation, PVC conduit was cut without deburring, and bushes were not fitted at cable entry points. Over time, the sharp edges cut into the cable insulation, causing a short circuit that resulted in:
          </div>
          <ul className="list-disc pl-6 text-xs sm:text-sm text-white mb-4 space-y-1">
            <li>Complete shutdown of the automated conveyor system</li>
            <li>8 hours of production downtime costing £25,000</li>
            <li>Emergency call-out charges for fault-finding</li>
            <li>Replacement of 40 metres of damaged multicore cable</li>
            <li>Full rewiring of the affected containment section</li>
          </ul>
          <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/30">
            <h3 className="font-semibold text-white mb-2 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-elec-yellow" />
              Lesson learned
            </h3>
            <p className="text-xs sm:text-sm text-white">
              The remedial work involved cutting out all affected sections, properly deburring all new cuts, and fitting appropriate bushes at every cable entry point. The installation now meets BS 7671 requirements and has operated fault-free for over three years. Total remedial cost exceeded £8,000 - far more than the original bush cost of £50.
            </p>
          </div>
        </Card>

        {/* Practical guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Enhanced Practical Guidance</h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <div>
              <h3 className="font-medium mb-2">Material Compatibility Matrix</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>PVC-to-PVC:</strong> Use manufacturer-matched couplers only. Temperature rating must match containment (typically -10°C to +60°C).</li>
                <li><strong>Steel-to-steel:</strong> Ensure galvanising compatibility. Mixed coating types require insulation barriers.</li>
                <li><strong>Dissimilar materials:</strong> Use transition fittings with insulation barriers to prevent galvanic corrosion.</li>
                <li><strong>Outdoor applications:</strong> UV-stabilised components essential. Check 10-year warranty minimum.</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Torque Specifications and Tool Requirements</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Steel conduit compression fittings:</strong> 15-25Nm torque. Use calibrated torque wrench for consistency.</li>
                <li><strong>PVC saddle fixings:</strong> 5-8Nm maximum. Over-torquing causes stress cracking and premature failure.</li>
                <li><strong>Cable tray bolts (M8):</strong> 25Nm with spring washers. Check retorque after 6 months.</li>
                <li><strong>Adjustment procedure:</strong> Hand-tight plus quarter-turn, then verify with torque wrench.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">Environmental Considerations and Specifications</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Corrosive environments:</strong> Stainless steel grade 316L minimum. Check chloride exposure levels.</li>
                <li><strong>High-vibration areas:</strong> Lock-nuts and spring washers mandatory. Reduce support spacing by 50%.</li>
                <li><strong>Temperature cycling:</strong> Allow 5mm expansion per 10°C for PVC runs over 6m length.</li>
                <li><strong>UV exposure:</strong> Black PVC degrades rapidly. Use UV-stabilised or covered installations only.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">Quality Assurance and Testing Procedures</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Pre-installation checks:</strong> Verify component batch numbers match. Check delivery damage.</li>
                <li><strong>Assembly verification:</strong> 100% visual inspection of joints. No gaps or misalignment acceptable.</li>
                <li><strong>Electrical testing:</strong> Continuity test every joint. Maximum 0.1Ω resistance end-to-end.</li>
                <li><strong>Load testing:</strong> Apply 150% working load for 1 hour. Check for deflection or loosening.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">Advanced Installation Techniques</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Thermal barrier installation:</strong> Use fire-rated bushes in wall penetrations. Maintain compartment integrity.</li>
                <li><strong>EMC considerations:</strong> Maintain screen continuity through metallic containment joints. Use conductive gaskets.</li>
                <li><strong>Seismic installations:</strong> Flexible couplers every 12m maximum. Allow building movement without damage.</li>
                <li><strong>Hazardous area compliance:</strong> Certified Ex-rated components only. Maintain temperature classification.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-white mb-2">Q: Can I mix fittings from different manufacturers?</h3>
              <p className="text-sm text-white">
                Not recommended. Manufacturing tolerances vary between suppliers, potentially affecting fit, sealing, and compliance. Use manufacturer-matched systems to maintain warranty and certification validity.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-white mb-2">Q: Are bushes required for PVC conduit installations?</h3>
              <p className="text-sm text-white">
                Yes. BS 7671 requires cable protection at all entry points regardless of conduit material. PVC can still have sharp edges after cutting that may damage cable insulation over time.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-white mb-2">Q: What if paint on steel conduit interferes with electrical continuity?</h3>
              <p className="text-sm text-white">
                Remove paint at contact points using wire brush or abrasive. Alternatively, install earth straps with green/yellow identification. Test continuity after assembly to verify &lt;0.1Ω resistance.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-white mb-2">Q: How do I prevent galvanic corrosion between different metals?</h3>
              <p className="text-sm text-white">
                Use insulation barriers (nylon washers, PTFE tape) between dissimilar metals. For structural joints, apply anti-corrosion compound and use stainless steel fixings.
              </p>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Summary</h2>
          <p className="text-xs sm:text-sm text-white">
            Correct assembly of containment systems using appropriate couplers, saddles, and bushes ensures mechanical strength, electrical continuity, and cable protection. Following manufacturer specifications, maintaining proper torque settings, and ensuring electrical continuity where required creates safe, compliant installations that meet BS 7671 standards and provide long-term reliability.
          </p>
        </Card>

        {/* Quiz */}
        <Quiz 
          questions={quizQuestions}
          title="Test your understanding of containment assembly and joining techniques"
        />
      </main>
    </div>
  );
};

export default Module4Section4_3;