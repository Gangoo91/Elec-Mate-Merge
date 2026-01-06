import { ArrowLeft, Zap, CheckCircle, AlertTriangle, Shield, TestTube, Battery } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Common Materials in Electrical Work - Level 2 Module 2 Section 5.2";
const DESCRIPTION = "Learn about common electrical materials including copper, aluminium, PVC, XLPE, and rubber - their properties and applications.";

const quickCheckQuestions = [
  {
    id: "copper-vs-aluminium",
    question: "Which statement about copper vs aluminium conductors is correct?",
    options: [
      "Aluminium has lower resistivity than copper",
      "Copper requires larger CSA for the same current",
      "Copper has lower resistivity but is heavier than aluminium",
      "Both materials have identical properties"
    ],
    correctIndex: 2,
    explanation: "Copper has lower resistivity (better conductor) but is heavier. Aluminium is lighter but needs larger CSA for the same current capacity."
  },
  {
    id: "xlpe-vs-pvc",
    question: "What is the main advantage of XLPE over PVC insulation?",
    options: [
      "XLPE is cheaper to manufacture",
      "XLPE has a higher temperature rating",
      "XLPE is easier to strip and terminate",
      "XLPE has better colour options"
    ],
    correctIndex: 1,
    explanation: "XLPE typically has a higher temperature rating (often 90°C) compared to PVC (typically 70°C), allowing higher current capacity."
  },
  {
    id: "termination-safety",
    question: "When connecting aluminium to copper, you should:",
    options: [
      "Use any standard connector",
      "Always solder the joint",
      "Use bimetallic connectors and follow manufacturer guidance",
      "Avoid the connection entirely"
    ],
    correctIndex: 2,
    explanation: "Bimetallic connectors prevent galvanic corrosion and ensure reliable connections between different conductor materials."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which metal has higher resistivity (lower conductivity) than copper?",
    options: ["Gold", "Aluminium", "Silver", "None – copper is highest"],
    correctAnswer: 1,
    explanation: "Aluminium has higher resistivity than copper, so a larger CSA is needed for the same current.",
  },
  {
    id: 2,
    question: "Which statement about aluminium terminations is correct?",
    options: [
      "They can use any copper lug",
      "They may require bimetallic lugs and specific torque",
      "No preparation needed",
      "Always soldered",
    ],
    correctAnswer: 1,
    explanation: "Use approved lugs, correct torque, and surface preparation to avoid creep/oxidation issues.",
  },
  {
    id: 3,
    question: "PVC vs XLPE insulation – which is typically true?",
    options: ["PVC has higher temperature rating than XLPE", "XLPE often allows higher operating temperature", "They are identical", "XLPE melts at lower temperatures"],
    correctAnswer: 1,
    explanation: "XLPE typically has a higher temperature rating than PVC, improving current capacity in some methods.",
  },
  {
    id: 4,
    question: "Which BS 7671 topics are most relevant to choosing materials and terminations?",
    options: ["Sections 521 and 526", "Part 1 only", "Inspection forms only", "Earthing only"],
    correctAnswer: 0,
    explanation: "521 covers wiring systems; 526 addresses electrical connections.",
  },
  {
    id: 5,
    question: "Why might aluminium be chosen over copper for long runs?",
    options: ["It has lower resistivity", "It is lighter and cheaper per metre", "It is stronger electrically", "It never corrodes"],
    correctAnswer: 1,
    explanation: "Aluminium is lighter and often cheaper; designs compensate with larger CSA and correct terminations.",
  },
  {
    id: 6,
    question: "LSF/LSZH sheaths are selected primarily to:",
    options: ["Increase current capacity", "Reduce smoke and toxic fumes in fire", "Change colour", "Make cable magnetic"],
    correctAnswer: 1,
    explanation: "Low smoke/halogen properties support life safety and asset protection in buildings.",
  },
  {
    id: 7,
    question: "For mixed copper/aluminium systems, a good practice is to:",
    options: ["Join directly with any connector", "Use bimetallic lugs and anti‑oxidant compounds where specified", "Paint them", "Always solder"],
    correctAnswer: 1,
    explanation: "Bimetallic interfaces limit galvanic corrosion; follow manufacturer instructions.",
  },
  {
    id: 8,
    question: "Which factor most affects voltage drop on long feeders?",
    options: ["Conductor resistivity and CSA", "Cable colour", "Sheath material only", "Conduit type only"],
    correctAnswer: 0,
    explanation: "Voltage drop depends on conductor resistance/reactance and CSA; see Appendix 4.",
  },
  {
    id: 9,
    question: "What is the typical temperature rating of XLPE insulation?",
    options: ["60°C", "70°C", "90°C", "110°C"],
    correctAnswer: 2,
    explanation: "XLPE typically has a 90°C temperature rating, higher than standard PVC at 70°C.",
  },
  {
    id: 10,
    question: "When should rubber insulation be considered?",
    options: ["Only for indoor use", "For flexible applications and harsh environments", "Never in electrical work", "Only for ELV circuits"],
    correctAnswer: 1,
    explanation: "Rubber insulation offers flexibility and can withstand harsh environmental conditions better than rigid plastics.",
  }
];

const faqs = [
  {
    question: "Why choose aluminium over copper for some applications?",
    answer: "Aluminium is significantly lighter and often more cost-effective for long cable runs. While it requires larger conductor sizes due to higher resistivity, the weight and cost savings can be substantial for major installations like overhead lines and large feeders."
  },
  {
    question: "What problems can occur with aluminium terminations?",
    answer: "Aluminium can suffer from 'creep' - gradual deformation under pressure that can loosen connections. It also oxidises readily, creating high-resistance layers. Use approved aluminium-rated terminals, apply anti-oxidant compound where specified, and follow re-torque schedules."
  },
  {
    question: "When would I choose XLPE over PVC insulation?",
    answer: "Choose XLPE when higher temperature ratings are needed (typically 90°C vs 70°C for PVC), in applications with higher ambient temperatures, or where the higher rating allows smaller cable sizes due to increased current capacity."
  },
  {
    question: "What does LSF/LSZH mean and when is it required?",
    answer: "Low Smoke Fume/Low Smoke Zero Halogen cables reduce toxic emissions in fires. They may be specified in public buildings, escape routes, plant rooms, or areas where smoke evacuation is critical for life safety."
  },
  {
    question: "Can I mix different conductor materials in one installation?",
    answer: "Yes, but use proper transition methods. Different materials expand at different rates and can create galvanic corrosion. Use bimetallic lugs, transition joints, or compatible terminals designed for mixed materials."
  },
  {
    question: "How do I calculate the right cable size for aluminium conductors?",
    answer: "Use the same methods as copper but account for higher resistivity. Check BS 7671 Appendix 4 tables for aluminium conductor ratings, and always verify voltage drop calculations as the higher resistance may require larger sizes than expected."
  }
];

const Module2Section5_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2.5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="h-8 w-8 text-elec-yellow" />
            <div>
              <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-2">
                Module 2.5.2
              </span>
              <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-white">
                Common Materials in Electrical Work
              </h1>
              <p className="text-xl text-white max-w-3xl mt-2">
                Compare conductor and insulation materials for practical electrical applications
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Copper vs Aluminium:</strong> Copper = lower resistance, Al = lighter/cheaper</li>
                <li><strong>PVC vs XLPE:</strong> PVC 70°C, XLPE 90°C typical ratings</li>
                <li><strong>LSF/LSZH:</strong> Low smoke properties for fire safety</li>
                <li><strong>Terminations:</strong> Bimetallic lugs for mixed materials</li>
                <li><strong>Selection:</strong> Match material to environment and application</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Cable markings, SWA armour, termination types, sheath materials</li>
                <li><strong>Use:</strong> Check manufacturer specs, torque values, temperature ratings</li>
                <li><strong>Apply:</strong> Consider cost, weight, environment in material selection</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
          <p className="text-white mb-4">By the end of this section, you'll be able to:</p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Compare copper and aluminium conductors for different applications</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Identify insulation types (PVC, XLPE, LSF/LSZH, rubber) and their uses</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Select appropriate termination methods for different materials</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Apply BS 7671 guidance to material selection and installation</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Understand the impact of material choice on voltage drop and current capacity</span>
            </li>
          </ul>
        </Card>

        {/* Section 1: Conductor Materials */}
        <div className="mb-8">
          <div className="border-l-4 border-elec-yellow dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="bg-elec-yellow text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
              Conductor Materials Comparison
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Choosing the right conductor material affects current capacity, voltage drop, cost, installation complexity, 
                and long-term reliability. Understanding the properties and trade-offs is essential for optimal design decisions 
                that balance technical performance with economic considerations.
              </p>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-card border border-border/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Copper - The Standard Choice
                    </h4>
                    <div className="space-y-2 text-blue-200 text-sm">
                      <div>
                        <p><strong>Physical Properties:</strong></p>
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Resistivity: 17.2 nΩ·m at 20°C</li>
                          <li>Density: 8.96 g/cm³</li>
                          <li>Excellent ductility and workability</li>
                          <li>Good corrosion resistance</li>
                        </ul>
                      </div>
                      <div>
                        <p><strong>Applications and Benefits:</strong></p>
                        <ul className="list-disc pl-4 space-y-1">
                          <li>T&E cables (domestic/commercial)</li>
                          <li>Flexible cords and appliance wiring</li>
                          <li>Control and instrumentation circuits</li>
                          <li>Reliable terminations with standard accessories</li>
                        </ul>
                      </div>
                      <div>
                        <p><strong>Economic Considerations:</strong></p>
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Higher material cost per metre</li>
                          <li>Lower installation labour costs</li>
                          <li>Smaller cable sizes reduce containment costs</li>
                          <li>Long-term reliability reduces maintenance</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-card border border-amber-400/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-amber-300 mb-2 flex items-center gap-2">
                      <Battery className="w-4 h-4" />
                      Aluminium - The Efficient Alternative
                    </h4>
                    <div className="space-y-2 text-amber-200 text-sm">
                      <div>
                        <p><strong>Physical Properties:</strong></p>
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Resistivity: 28.2 nΩ·m at 20°C</li>
                          <li>Density: 2.70 g/cm³ (70% lighter than copper)</li>
                          <li>Excellent strength-to-weight ratio</li>
                          <li>Forms protective oxide layer</li>
                        </ul>
                      </div>
                      <div>
                        <p><strong>Applications and Benefits:</strong></p>
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Overhead transmission and distribution</li>
                          <li>Large commercial and industrial feeders</li>
                          <li>Long cable runs where weight matters</li>
                          <li>Significant cost savings on large projects</li>
                        </ul>
                      </div>
                      <div>
                        <p><strong>Technical Challenges:</strong></p>
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Thermal expansion and 'creep' under load</li>
                          <li>Oxide formation affects connections</li>
                          <li>Requires aluminium-compatible terminations</li>
                          <li>More complex installation procedures</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-teal-500/10 border border-teal-400/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-teal-300 mb-2">Detailed Comparison Analysis</h4>
                  <div className="grid md:grid-cols-3 gap-3 sm:gap-4 text-teal-200 text-sm">
                    <div>
                      <p><strong>Electrical Performance:</strong></p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Copper: 1.6× current capacity per CSA</li>
                        <li>Aluminium: Lower voltage drop per kg</li>
                        <li>Both: Similar temperature coefficients</li>
                      </ul>
                    </div>
                    <div>
                      <p><strong>Mechanical Properties:</strong></p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Copper: Higher tensile strength</li>
                        <li>Aluminium: Better corrosion resistance</li>
                        <li>Both: Good fatigue resistance when properly installed</li>
                      </ul>
                    </div>
                    <div>
                      <p><strong>Environmental Impact:</strong></p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Copper: Higher embodied energy</li>
                        <li>Aluminium: Abundant raw material</li>
                        <li>Both: Highly recyclable materials</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-500/10 border border-indigo-400/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-indigo-300 mb-2">Practical Example: 100A Feeder Comparison</h4>
                  <div className="text-indigo-200 text-sm space-y-2">
                    <p><strong>Application:</strong> 150m three-phase feeder, 100A load, reference method D (buried)</p>
                    <div className="bg-indigo-600/20 p-3 rounded space-y-2">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p><strong>Copper Solution:</strong></p>
                          <ul className="list-disc pl-4 space-y-1">
                            <li>Cable: 25mm² Cu SWA</li>
                            <li>Weight: ~8.5 kg/m × 150m = 1,275kg</li>
                            <li>Voltage drop: 2.4V/A/km × 100A × 0.15km = 36V (8%)</li>
                            <li>Material cost: Higher per metre</li>
                          </ul>
                        </div>
                        <div>
                          <p><strong>Aluminium Solution:</strong></p>
                          <ul className="list-disc pl-4 space-y-1">
                            <li>Cable: 35mm² Al SWA</li>
                            <li>Weight: ~6.2 kg/m × 150m = 930kg</li>
                            <li>Voltage drop: 2.4V/A/km × 100A × 0.15km = 36V (8%)</li>
                            <li>Material cost: Lower per metre</li>
                          </ul>
                        </div>
                      </div>
                      <p><strong>Key Insight:</strong> Both achieve same electrical performance; choose based on cost, weight, and termination complexity</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <div className="space-y-2">
                  <p className="text-yellow-300 font-semibold">
                    Critical Design Rule: CSA Equivalence
                  </p>
                  <div className="text-yellow-200 text-sm">
                    <p>For equivalent current-carrying capacity: <strong>Al CSA ≈ 1.6 × Cu CSA</strong></p>
                    <p>This factor accounts for the resistivity difference and ensures similar electrical performance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Insulation Materials */}
        <div className="mb-8">
          <div className="border-l-4 border-elec-yellow dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="bg-elec-yellow text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
              Insulation and Sheath Materials
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Insulation material selection affects cable temperature rating, current capacity, environmental resistance, 
                and fire performance. Understanding these properties is essential for safe installations.
              </p>
              
              <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-card border border-border/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-elec-yellow mb-2">PVC / LSF</h4>
                  <ul className="space-y-1 text-purple-200 text-sm">
                    <li>• <strong>Rating:</strong> Typically 70°C</li>
                    <li>• <strong>Uses:</strong> T&E, flex, general wiring</li>
                    <li>• <strong>LSF:</strong> Low smoke properties</li>
                    <li>• <strong>Cost:</strong> Economical option</li>
                  </ul>
                </div>
                
                <div className="bg-card border border-elec-yellow/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-elec-yellow mb-2">XLPE</h4>
                  <ul className="space-y-1 text-emerald-200 text-sm">
                    <li>• <strong>Rating:</strong> Typically 90°C</li>
                    <li>• <strong>Uses:</strong> SWA, high-performance cables</li>
                    <li>• <strong>Benefit:</strong> Higher current capacity</li>
                    <li>• <strong>Applications:</strong> Industrial, distribution</li>
                  </ul>
                </div>
                
                <div className="bg-rose-500/10 border border-rose-400/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-rose-300 mb-2">Rubber / Elastomers</h4>
                  <ul className="space-y-1 text-rose-200 text-sm">
                    <li>• <strong>Uses:</strong> Flexible cords, mobile equipment</li>
                    <li>• <strong>Benefits:</strong> Flexibility, low-temp performance</li>
                    <li>• <strong>Varieties:</strong> Natural, synthetic rubber</li>
                    <li>• <strong>Environment:</strong> Oil/chemical resistance options</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-card border border-border/30 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <p className="text-elec-yellow">
                    <strong>Important:</strong> LSZH (Low Smoke Zero Halogen) cables may be required in certain applications 
                    for improved fire performance and reduced toxic emissions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Termination and Connection Methods */}
        <div className="mb-8">
          <div className="border-l-4 border-purple-500 dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
              Termination and Connection Considerations
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Proper termination methods are critical for safety and reliability. Different materials require 
                specific techniques and components to ensure lasting, safe connections.
              </p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-elec-yellow">Critical Termination Factors</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><strong>Material Compatibility:</strong> Use approved terminals for conductor material (Cu/Al rating)</li>
                    <li><strong>Torque Values:</strong> Follow manufacturer specifications - over/under-torquing causes failures</li>
                    <li><strong>Surface Preparation:</strong> Remove oxidation, apply compounds where specified</li>
                    <li><strong>Creep and Expansion:</strong> Consider thermal movement, especially with aluminium</li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-card border border-border/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-elec-yellow mb-2">Copper Terminations</h4>
                    <ul className="list-disc pl-4 space-y-1 text-sm text-purple-200">
                      <li>Standard copper-rated terminals</li>
                      <li>Stable connections, minimal maintenance</li>
                      <li>Good resistance to corrosion</li>
                      <li>Wide variety of connector types</li>
                    </ul>
                  </div>
                  <div className="bg-card border border-border/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-elec-yellow mb-2">Aluminium Terminations</h4>
                    <ul className="list-disc pl-4 space-y-1 text-sm text-purple-200">
                      <li>Al-rated or bimetallic lugs required</li>
                      <li>Anti-oxidant compound where specified</li>
                      <li>Regular inspection and re-torque schedule</li>
                      <li>Special surface preparation procedures</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Practical Guidance for Apprentices</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Material Selection Process</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card border border-border/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-elec-yellow mb-2">Assessment Criteria</h4>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-blue-200">
                    <li>Current requirements and load calculations</li>
                    <li>Environmental conditions and temperature</li>
                    <li>Installation method and accessibility</li>
                    <li>Cost considerations and project budget</li>
                  </ul>
                </div>
                <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-elec-yellow mb-2">Decision Factors</h4>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-elec-yellow/80">
                    <li>Voltage drop limits (longer runs may need larger Al)</li>
                    <li>Fire performance requirements (LSF/LSZH)</li>
                    <li>Flexibility needs (rubber for portable equipment)</li>
                    <li>Maintenance access and schedule</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Installation Best Practices</h3>
              <div className="bg-card border border-elec-yellow/30 p-4 rounded-lg">
                <ul className="list-disc pl-4 space-y-2 text-sm text-emerald-200">
                  <li><strong>Documentation:</strong> Record conductor material, CSA, and insulation type on certificates</li>
                  <li><strong>Termination Quality:</strong> Use calibrated torque tools and verify connection tightness</li>
                  <li><strong>Environmental Protection:</strong> Ensure IP ratings and environmental sealing are adequate</li>
                  <li><strong>Future Access:</strong> Consider maintenance requirements and connection accessibility</li>
                  <li><strong>Mixed Systems:</strong> Clearly label where different materials are used</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Common Problems and Solutions</h3>
              <div className="bg-card border border-border/30 p-4 rounded-lg">
                <div className="space-y-3 text-sm text-red-200">
                  <div>
                    <p className="font-semibold">Loose Aluminium Connections:</p>
                    <p>Caused by creep and oxidation. Use Al-rated terminals, apply anti-oxidant, follow re-torque schedules.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Excessive Voltage Drop:</p>
                    <p>Check calculations for actual conductor material. Aluminium may need larger CSA than expected.</p>
                  </div>
                  <div>
                    <p className="font-semibold">Insulation Overheating:</p>
                    <p>Verify temperature ratings and apply derating factors for grouping and ambient conditions.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-8 p-0 bg-transparent border-white/20 bg-none shadow-none overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-lg sm:text-xl font-semibold text-white">Frequently Asked Questions</h2>
          </div>
          <div className="divide-y divide-border/20">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pocket Guide */}
        <div className="mb-8 space-y-6">
          <Card className="p-6 bg-transparent border-white/20 bg-none shadow-none">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-elec-yellow" />
                <h2 className="text-lg sm:text-xl font-semibold text-white">Material Selection Pocket Guide</h2>
              </div>
              <p className="text-sm text-white">
                Quick reference for common electrical materials and their applications
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm">
              <div className="space-y-4">
                <div className="bg-card border border-border/30 p-3 rounded-lg">
                  <h4 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Conductor Comparison
                  </h4>
                  <ul className="space-y-1 text-blue-200 text-xs">
                    <li>• <strong>Copper:</strong> 17.2 nΩ·m, easy termination</li>
                    <li>• <strong>Aluminium:</strong> 28.2 nΩ·m, 60% lighter</li>
                    <li>• <strong>CSA rule:</strong> Al needs ~1.6× Cu area</li>
                    <li>• <strong>Cost:</strong> Al cheaper per metre, Cu per ampere</li>
                  </ul>
                </div>
                
                <div className="bg-card border border-border/30 p-3 rounded-lg">
                  <h4 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Insulation Types
                  </h4>
                  <ul className="space-y-1 text-purple-200 text-xs">
                    <li>• <strong>PVC:</strong> 70°C, T&E, economical</li>
                    <li>• <strong>XLPE:</strong> 90°C, SWA, higher capacity</li>
                    <li>• <strong>LSF/LSZH:</strong> Fire performance</li>
                    <li>• <strong>Rubber:</strong> Flexible, mobile equipment</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-card border border-elec-yellow/30 p-3 rounded-lg">
                  <h4 className="font-semibold text-elec-yellow mb-2">Selection Checklist</h4>
                  <ul className="space-y-1 text-emerald-200 text-xs">
                    <li>• <strong>Current:</strong> Check capacity tables (App 4)</li>
                    <li>• <strong>Voltage drop:</strong> Calculate for actual length</li>
                    <li>• <strong>Environment:</strong> Temperature, moisture, chemicals</li>
                    <li>• <strong>Installation:</strong> Method affects rating</li>
                    <li>• <strong>Fire:</strong> Consider LSF/LSZH requirements</li>
                  </ul>
                </div>
                
                <div className="bg-card border border-border/30 p-3 rounded-lg">
                  <h4 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Termination Safety
                  </h4>
                  <ul className="space-y-1 text-red-200 text-xs">
                    <li>• <strong>Al terminals:</strong> Use bimetallic or Al-rated</li>
                    <li>• <strong>Torque:</strong> Follow manufacturer specs exactly</li>
                    <li>• <strong>Maintenance:</strong> Re-torque Al connections</li>
                    <li>• <strong>Mixed materials:</strong> Prevent galvanic issues</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="grid grid-cols-4 gap-4 text-xs">
                <div className="text-center">
                  <p className="font-semibold text-white">Cu Resistivity</p>
                  <p className="text-white">17.2 nΩ·m</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-white">Al Resistivity</p>
                  <p className="text-white">28.2 nΩ·m</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-white">PVC Rating</p>
                  <p className="text-white">70°C</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-white">XLPE Rating</p>
                  <p className="text-white">90°C</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Quiz */}
        <Quiz 
          title="Test Your Knowledge: Common Electrical Materials"
          questions={quizQuestions}
        />

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
          <Button variant="outline" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button asChild>
            <Link to="..">
              Next
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Module2Section5_2;