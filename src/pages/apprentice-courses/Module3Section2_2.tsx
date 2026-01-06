import useSEO from "@/hooks/useSEO";
import {
  ArrowLeft,
  Wrench,
  AlertTriangle,
  Factory,
  Home,
  Shield,
  Building,
  Target,
  Scissors,
  Settings,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import React from "react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const quickCheckQuestions = [
  {
    id: "pvc-advantage",
    question: "Name one advantage of PVC conduit over metal conduit.",
    options: [
      "Stronger mechanical protection",
      "Easier to cut and install",
      "Better earth path capability",
    ],
    correctIndex: 1,
    explanation:
      "PVC conduit is much easier to cut with simple tools and join using solvent cement, requiring less skill than threading and coupling steel conduit.",
  },
  {
    id: "steel-earthing",
    question: "Why must steel conduit joints be electrically continuous?",
    options: [
      "To prevent rust formation",
      "To ensure safe earthing path",
      "To make installation faster",
    ],
    correctIndex: 1,
    explanation:
      "Steel conduit can serve as the earth path for the circuit, so all joints must be electrically continuous and tested to ensure fault current can safely flow to earth.",
  },
  {
    id: "industrial-conduit",
    question: "Which type of conduit is more suitable for heavy industrial environments?",
    options: [
      "PVC conduit",
      "Steel conduit", 
      "Flexible PVC conduit",
    ],
    correctIndex: 1,
    explanation:
      "Steel conduit provides superior mechanical protection against impacts from machinery, tools and vehicles commonly found in industrial environments.",
  },
  {
    id: "conduit-protection",
    question: "What is used at conduit entry points to protect cable insulation?",
    options: [
      "Cable ties",
      "Bushes or grommets",
      "Insulation tape",
    ],
    correctIndex: 1,
    explanation:
      "Bushes or grommets prevent sharp edges at conduit entry points from cutting through cable insulation during installation or service.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What is one major advantage of PVC conduit over metal conduit?",
    options: [
      "Stronger mechanical protection",
      "Easier to cut and install", 
      "Better earth path capability",
      "Higher heat resistance",
    ],
    correctAnswer: 1,
    explanation:
      "PVC conduit is much easier to cut with simple tools and join using solvent cement, making installation faster and requiring less skilled labour.",
  },
  {
    id: 2,
    question: "Which type of conduit is more suitable for heavy industrial environments?",
    options: [
      "PVC conduit",
      "Steel conduit",
      "Flexible PVC conduit", 
      "Aluminium conduit",
    ],
    correctAnswer: 1,
    explanation:
      "Steel conduit provides superior mechanical protection against the impacts and harsh conditions typically found in heavy industrial environments.",
  },
  {
    id: 3,
    question: "True or False: Steel conduit can act as an earth path.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. Steel conduit, when properly installed with electrical continuity between all joints, can serve as the protective conductor (earth path) for the circuit.",
  },
  {
    id: 4,
    question: "Give one disadvantage of recessed conduit installation.",
    options: [
      "Higher material costs",
      "More labour-intensive and harder to modify later",
      "Poor mechanical protection",
      "Limited cable capacity",
    ],
    correctAnswer: 1,
    explanation:
      "Recessed installation requires chasing walls, is more time-consuming, and makes future modifications or repairs much more difficult and disruptive.",
  },
  {
    id: 5,
    question: "What is used at conduit ends to prevent damage to cable insulation?",
    options: [
      "Cable ties",
      "Insulation tape",
      "Bushes or grommets",
      "Plastic sleeves",
    ],
    correctAnswer: 2,
    explanation:
      "Bushes or grommets are fitted at conduit entry points to prevent sharp edges from cutting cable insulation during installation or thermal movement.",
  },
  {
    id: 6,
    question: "Why is electrical continuity important in metal conduit systems?",
    options: [
      "To prevent rust",
      "To ensure safe earthing",
      "To make installation easier",
      "To improve appearance",
    ],
    correctAnswer: 1,
    explanation:
      "Electrical continuity ensures the metal conduit can safely carry fault current to earth, providing protection against electric shock and fire.",
  },
  {
    id: 7,
    question: "Name one situation where surface-mounted conduit is preferred.",
    options: [
      "Domestic living rooms",
      "Industrial settings or retrofit installations",
      "Hotel bedrooms",
      "Office reception areas",
    ],
    correctAnswer: 1,
    explanation:
      "Surface mounting is preferred in industrial settings for durability and accessibility, and in retrofit situations where chasing walls would be disruptive.",
  },
  {
    id: 8,
    question: "Which regulation covers conduit installation in the UK?",
    options: [
      "BS 7909",
      "BS 7671 (IET Wiring Regulations)",
      "BS 5839",
      "BS 6701",
    ],
    correctAnswer: 1,
    explanation:
      "BS 7671 (IET Wiring Regulations) sets the requirements for electrical installations including conduit systems, support spacing, and earthing requirements.",
  },
];

const Module3Section2_2: React.FC = () => {
  console.log("Module3Section2_2 component loaded");
  
  useSEO(
    "PVC and Metal Conduit – Module 3 (3.2.2)",
    "Complete guide to PVC and steel conduit systems. Surface and recessed installation, best practices and BS 7671 compliance."
  );

  const faqs = [
    {
      q: "Can PVC conduit be used outdoors?",
      a: "Yes, if it is UV-stabilised and weatherproof fittings are used. Standard PVC can degrade under UV exposure.",
    },
    {
      q: "Is metal conduit always earthed?",
      a: "Yes — if used as an earth path, it must be electrically continuous and tested to confirm compliance with BS 7671.",
    },
    {
      q: "Can recessed conduit be added after walls are finished?",
      a: "It's possible but highly disruptive — surface mounting is usually more practical and cost-effective in retrofit situations.",
    },
    {
      q: "What's the maximum support spacing for 20mm PVC conduit?",
      a: "750mm for horizontal runs and 1000mm for vertical runs to prevent sagging and maintain appearance.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="text-white hover:text-white active:text-white p-0 -ml-1"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3.2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg ">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <Badge
              variant="outline"
              className="border-elec-yellow/30 text-elec-yellow"
            >
              Section 3.2.2
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            PVC and Metal Conduit (Surface/Recessed)
          </h1>
          <p className="text-white">
            Understanding conduit materials, installation methods and practical application techniques.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
            Introduction
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>PVC: lightweight, easy to work, cost-effective for most applications.</li>
                <li>Steel: maximum protection, can be earthed, ideal for harsh environments.</li>
                <li>Surface: quick install, easy access; Recessed: neat appearance, more labour.</li>
                <li>Choose based on environment, protection needs and aesthetic requirements.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Spot:</strong> Round white (PVC) or grey/black (steel) tubes on surfaces or in walls.
                </li>
                <li>
                  <strong>Use:</strong> PVC for most domestic/light commercial; Steel for industrial/high-risk.
                </li>
                <li>
                  <strong>Check:</strong> Support spacing, bend radius, electrical continuity (steel), bushes at entries.
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
            Learning outcomes
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
            <li>Identify the characteristics of PVC and metal conduit systems.</li>
            <li>Explain the differences between surface and recessed conduit installation.</li>
            <li>Select the correct conduit type for different environments and applications.</li>
            <li>Understand key installation requirements and practical techniques for both conduit types.</li>
            <li>Apply BS 7671 requirements for support, earthing and protection.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content</h2>

          {/* Conduit Types */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5" /> Conduit Types and Characteristics
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                  <p className="font-medium mb-2">PVC Conduit Systems</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-blue-200 mb-1">Material & Construction</p>
                      <ul className="list-disc pl-4 space-y-1 text-blue-200">
                        <li>Rigid PVC (polyvinyl chloride) - non-metallic</li>
                        <li>Available in 16mm, 20mm, 25mm, 32mm diameters</li>
                        <li>Standard 3m lengths with coupling joints</li>
                        <li>Colour coded: white (standard), grey (heavy duty)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-blue-200 mb-1">Key Advantages</p>
                      <ul className="list-disc pl-4 space-y-1 text-blue-200">
                        <li>Easy cutting with hacksaw or PVC cutter</li>
                        <li>Simple solvent-welded joints</li>
                        <li>Corrosion resistant in damp conditions</li>
                        <li>Non-conductive - no earthing required</li>
                        <li>Lower cost than steel systems</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-blue-200 mb-1">Limitations</p>
                      <ul className="list-disc pl-4 space-y-1 text-blue-200">
                        <li>Lower impact resistance than steel</li>
                        <li>Can soften and distort under heat (&gt;70°C)</li>
                        <li>UV degradation without stabilisers</li>
                        <li>Expansion joints needed for long runs</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                  <p className="font-medium mb-2">Metal Conduit Systems (Steel)</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-red-200 mb-1">Material & Construction</p>
                      <ul className="list-disc pl-4 space-y-1 text-red-200">
                        <li>Galvanised or enamel-coated steel tubes</li>
                        <li>Sizes: 16mm, 20mm, 25mm, 32mm, 40mm, 50mm</li>
                        <li>Threaded ends with steel couplings</li>
                        <li>Black enamel (internal) or galvanised (external)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-red-200 mb-1">Key Advantages</p>
                      <ul className="list-disc pl-4 space-y-1 text-red-200">
                        <li>Excellent mechanical protection against impact</li>
                        <li>Can serve as protective conductor (earth path)</li>
                        <li>Fire resistant - won't melt or burn</li>
                        <li>Long service life in harsh environments</li>
                        <li>Professional appearance when surface mounted</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-red-200 mb-1">Limitations</p>
                      <ul className="list-disc pl-4 space-y-1 text-red-200">
                        <li>Heavier and more labour intensive</li>
                        <li>Requires threading, bending and coupling skills</li>
                        <li>Corrosion risk in very damp conditions</li>
                        <li>Higher material and installation costs</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[0]} />
          <Separator className="my-6" />

          {/* Installation Methods */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Settings className="w-5 h-5" /> Installation Methods: Surface vs Recessed
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                  <p className="font-medium mb-2">Surface-Mounted Installation</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-green-200 mb-1">Characteristics</p>
                      <ul className="list-disc pl-4 space-y-1 text-green-200">
                        <li>Conduit visible on wall/ceiling surfaces</li>
                        <li>Fixed with clips, brackets or saddles</li>
                        <li>Quick installation with standard fixings</li>
                        <li>Easy access for inspection and testing</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-green-200 mb-1">Best Applications</p>
                      <ul className="list-disc pl-4 space-y-1 text-green-200">
                        <li>Industrial workshops and factories</li>
                        <li>Plant rooms and service areas</li>
                        <li>Retrofit installations</li>
                        <li>Areas where regular access needed</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-green-200 mb-1">Support Requirements</p>
                      <ul className="list-disc pl-4 space-y-1 text-green-200">
                        <li>PVC: 750mm horizontal, 1000mm vertical</li>
                        <li>Steel: 1000mm horizontal, 1500mm vertical</li>
                        <li>Additional support near bends and junctions</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                  <p className="font-medium mb-2">Recessed (Flush) Installation</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-purple-200 mb-1">Characteristics</p>
                      <ul className="list-disc pl-4 space-y-1 text-purple-200">
                        <li>Conduit hidden within wall chases</li>
                        <li>Plastered over for invisible finish</li>
                        <li>Requires careful planning and marking out</li>
                        <li>Limited access once installation complete</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-purple-200 mb-1">Best Applications</p>
                      <ul className="list-disc pl-4 space-y-1 text-purple-200">
                        <li>Domestic installations (living areas)</li>
                        <li>Offices and commercial interiors</li>
                        <li>Hotels and retail spaces</li>
                        <li>Anywhere appearance is critical</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-purple-200 mb-1">Installation Considerations</p>
                      <ul className="list-disc pl-4 space-y-1 text-purple-200">
                        <li>Chase depth: 1/3 wall thickness maximum</li>
                        <li>Protect conduit during plastering</li>
                        <li>Mark positions before covering</li>
                        <li>Use oval conduit to minimise chase depth</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[1]} />
          <Separator className="my-6" />

          {/* Practical Installation Techniques */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Wrench className="w-5 h-5" /> Practical Installation Techniques
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="rounded-lg p-4 bg-transparent border border-amber-400/30">
                <p className="font-medium mb-2">PVC Conduit Installation</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-amber-200 mb-1">Cutting and Joining</p>
                    <ul className="list-disc pl-4 space-y-1 text-amber-200">
                      <li>Use fine-tooth hacksaw or PVC pipe cutter</li>
                      <li>Deburr cut ends with file or knife</li>
                      <li>Clean surfaces before solvent welding</li>
                      <li>Apply cement and join within 10 seconds</li>
                      <li>Hold joint for 30 seconds to cure</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-amber-200 mb-1">Bending and Routing</p>
                    <ul className="list-disc pl-4 space-y-1 text-amber-200">
                      <li>Use purpose-made bends rather than site bending</li>
                      <li>Maximum 4 x 90° bends between draw points</li>
                      <li>Maintain 6 x diameter minimum bend radius</li>
                      <li>Plan routes to minimise bends and joints</li>
                      <li>Allow for thermal expansion on long runs</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium mb-2">Steel Conduit Installation</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-orange-200 mb-1">Threading and Coupling</p>
                    <ul className="list-disc pl-4 space-y-1 text-orange-200">
                      <li>Cut square with hacksaw or pipe cutter</li>
                      <li>Remove sharp edges and burrs</li>
                      <li>Thread ends using stocks and dies</li>
                      <li>Apply jointing compound to threads</li>
                      <li>Tighten couplings for electrical continuity</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-orange-200 mb-1">Bending and Earthing</p>
                    <ul className="list-disc pl-4 space-y-1 text-orange-200">
                      <li>Use conduit bender for smooth radius bends</li>
                      <li>Test electrical continuity at all joints</li>
                      <li>Bond earth terminal at main positions</li>
                      <li>Maximum resistance: 0.05Ω per joint</li>
                      <li>Install earth continuity conductor if required</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-lg p-4 bg-teal-500/10 border border-teal-400/30">
                <p className="font-medium mb-2">Cable Installation Best Practices</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-teal-200 mb-1">Cable Pulling Techniques</p>
                    <ul className="list-disc pl-4 space-y-1 text-teal-200">
                      <li>Use draw wire or tape for cable pulling</li>
                      <li>Apply pulling compound on long runs</li>
                      <li>Pull steadily - avoid jerky movements</li>
                      <li>Don't exceed cable pulling tension limits</li>
                      <li>Support cables every 150mm in vertical runs</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-teal-200 mb-1">Protection and Termination</p>
                    <ul className="list-disc pl-4 space-y-1 text-teal-200">
                      <li>Fit bushes or grommets at all entry points</li>
                      <li>Ensure adequate cable identification</li>
                      <li>Leave service loops at termination points</li>
                      <li>Seal unused conduit ends</li>
                      <li>Test insulation resistance after installation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[2]} />
          <Separator className="my-6" />
          <InlineCheck {...quickCheckQuestions[3]} />
        </Card>

        {/* Common Mistakes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Common Mistakes and How to Avoid Them</h2>
          
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium mb-2 text-elec-yellow">Excessive bends between draw points</p>
              <ul className="list-disc pl-4 space-y-1 text-red-200">
                <li>More than 4 x 90° bends making cable pulling impossible</li>
                <li>Tight radius bends damaging cables during installation</li>
                <li><strong>Solution:</strong> Plan routes carefully, use inspection boxes every 4 bends, maintain proper bend radius</li>
              </ul>
            </div>

            <div className="rounded-lg p-4 bg-transparent border border-amber-400/30">
              <p className="font-medium mb-2 text-amber-300">Poor support and fixing</p>
              <ul className="list-disc pl-4 space-y-1 text-amber-200">
                <li>Inadequate support spacing causing conduit sag</li>
                <li>Using incorrect fixings for wall type</li>
                <li><strong>Solution:</strong> Follow manufacturer's support spacing guidelines, use appropriate fixings for substrate</li>
              </ul>
            </div>

            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium mb-2 text-elec-yellow">Steel conduit earthing failures</p>
              <ul className="list-disc pl-4 space-y-1 text-orange-200">
                <li>Poor electrical continuity through joints</li>
                <li>Relying on paint or corrosion-compromised connections</li>
                <li><strong>Solution:</strong> Clean threads, use jointing compound, test continuity, install supplementary earth if needed</li>
              </ul>
            </div>

            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium mb-2 text-elec-yellow">Inadequate cable protection</p>
              <ul className="list-disc pl-4 space-y-1 text-purple-200">
                <li>Missing bushes allowing cable insulation damage</li>
                <li>Sharp edges not removed from cut conduit</li>
                <li><strong>Solution:</strong> Always fit protective bushes, deburr all cut ends, inspect before cable installation</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* BS 7671 Context */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">BS 7671 Context and Compliance</h2>
          
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <p className="text-white">
              Conduit installation must comply with specific BS 7671 requirements:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Section 522.8.10:</strong> Mechanical protection requirements - conduit providing adequate protection against damage</li>
              <li><strong>Section 521.10.202:</strong> Support and fixings to prevent premature collapse during fire</li>
              <li><strong>Section 543.2.9:</strong> Metallic conduit as protective conductor - electrical continuity and cross-sectional area requirements</li>
              <li><strong>Section 528:</strong> Proximity to other services and segregation requirements</li>
              <li><strong>Section 522.3:</strong> Selection according to external influences (temperature, corrosion, impact)</li>
            </ul>

            <div className="mt-6 p-4 border-l-4 border-elec-yellow bg-elec-yellow/10 rounded-r-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-elec-yellow mb-1">Key Testing Requirement</p>
                  <p className="text-sm">
                    "Where metallic conduit is used as protective conductor, electrical continuity must be verified by measurement. 
                    Maximum resistance should not exceed 0.05Ω per joint." - Section 543.2.9
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Real‑world scenario */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 border border-border/30">
          <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" /> Real‑world scenario: Retail store refurbishment
          </h2>
          
          <div className="p-4 border-l-4 border-elec-yellow bg-elec-yellow/5 rounded-r-lg mb-4">
            <div className="flex items-start gap-3">
              <Building className="w-6 h-6 text-elec-yellow mt-1 flex-shrink-0" />
              <div className="text-blue-200">
                <p className="font-medium mb-2">The Challenge</p>
                <p className="text-sm leading-relaxed">
                  A high-end clothing retailer needed complete rewiring during renovation. The customer area required 
                  an upmarket appearance while the stockroom needed practical, durable installation:
                </p>
                <ul className="list-disc pl-4 mt-2 text-sm space-y-1">
                  <li>Sales floor: Premium finish essential for brand image</li>
                  <li>Stockroom: Regular trolley and ladder impacts expected</li>
                  <li>Changing rooms: Recessed installation required for hygiene</li>
                  <li>Back office: Future flexibility needed for IT changes</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="rounded-lg p-3 border border-green-400/30">
              <p className="font-medium text-green-300 mb-2">Solution: Mixed Approach</p>
              <ul className="list-disc pl-4 space-y-1 text-green-200 text-sm">
                <li>Sales areas: 20mm PVC recessed in walls, oval conduit to minimise chases</li>
                <li>Stockroom: 25mm steel surface-mounted at 3m height</li>
                <li>Changing rooms: 16mm PVC recessed with careful waterproofing</li>
                <li>Back office: 32mm steel trunking for high cable capacity</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 border border-elec-yellow/30">
              <p className="font-medium text-elec-yellow mb-2">Benefits Delivered</p>
              <ul className="list-disc pl-4 space-y-1 text-elec-yellow text-sm">
                <li>Perfect aesthetic finish in customer areas</li>
                <li>Zero damage incidents in stockroom after 2 years</li>
                <li>Easy IT additions via accessible trunking</li>
                <li>Installation completed on schedule and budget</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
            Frequently asked questions
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            {faqs.map((faq, idx) => (
              <div key={idx}>
                <p className="font-medium mb-1">{faq.q}</p>
                <p className="text-white">{faq.a}</p>
                {idx < faqs.length - 1 && (
                  <Separator className="mt-4" />
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 border border-elec-yellow/30">
          <h2 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-2">Summary</h2>
          <p className="text-elec-yellow text-sm leading-relaxed">
            PVC and steel conduit each have distinct advantages - choose PVC for ease of installation and cost-effectiveness, 
            steel for maximum protection and harsh environments. Surface mounting provides accessibility and speed, 
            while recessed installation delivers aesthetic appeal at the cost of flexibility.
          </p>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
            Test your knowledge
          </h2>
          <Quiz
            questions={quizQuestions}
            title="PVC and Metal Conduit Knowledge Test"
          />
        </Card>
      </main>
    </div>
  );
};

export default Module3Section2_2;