import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Anchor,
  Ruler,
  Weight,
} from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE =
  "Cable Support Distances (Horizontal/Vertical) - Module 3.6.1 | Level 2 Electrical Course";
const DESCRIPTION =
  "Master the essential requirements for cable support distances in electrical installations. Learn BS 7671 compliance, fire safety requirements, and best practice for different cable types.";

// End-of-section quiz (8 questions)
const quizQuestions = [
  {
    id: 1,
    question: "What's the maximum horizontal support distance for standard PVC sheathed cable?",
    options: ["250 mm", "300 mm", "400 mm", "450 mm"],
    correctAnswer: 1,
    explanation:
      "Non-armoured PVC insulated and sheathed cables have a maximum horizontal support distance of 300mm to prevent excessive sagging.",
  },
  {
    id: 2,
    question: "True or False: SWA cables can have a wider support spacing than PVC-sheathed cables.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. Steel Wire Armoured (SWA) cables are mechanically stronger and can span greater distances - up to 450mm horizontally vs 300mm for standard PVC cables.",
  },
  {
    id: 3,
    question: "Which type of cable support is required in escape routes?",
    options: [
      "Plastic clips only",
      "Metal fixings or non-combustible supports",
      "Cable ties only",
      "Adhesive mounts",
    ],
    correctAnswer: 1,
    explanation:
      "BS 7671 18th Edition Amendment 2 requires non-combustible supports in escape routes to prevent cable collapse during fire.",
  },
  {
    id: 4,
    question: "What is the main reason for closer support spacing on flexible cables?",
    options: [
      "They are more expensive",
      "They sag more between fixings due to construction",
      "They conduct more current",
      "They are heavier than solid cables",
    ],
    correctAnswer: 1,
    explanation:
      "Flexible cables have stranded conductors and softer sheathing that sags more readily, requiring support every 250mm horizontally.",
  },
  {
    id: 5,
    question: "Name one installation location where extra supports may be needed.",
    options: [
      "Indoor office environments",
      "Outdoor runs subject to wind/thermal expansion",
      "Standard domestic installations",
      "Low-current lighting circuits",
    ],
    correctAnswer: 1,
    explanation:
      "Outdoor installations face wind loading, temperature cycling, and UV exposure requiring additional intermediate supports beyond standard spacing.",
  },
  {
    id: 6,
    question: "What is the maximum vertical support distance for SWA cable?",
    options: ["400 mm", "500 mm", "600 mm", "700 mm"],
    correctAnswer: 2,
    explanation:
      "SWA cables can be supported at 600mm intervals vertically, taking advantage of gravity to reduce sagging compared to horizontal runs.",
  },
  {
    id: 7,
    question: "Give one hazard caused by inadequate cable supports.",
    options: [
      "Improved cable flexibility",
      "Sagging cables creating trip hazards",
      "Reduced installation time",
      "Lower material costs",
    ],
    correctAnswer: 1,
    explanation:
      "Inadequate supports cause cable sagging leading to trip hazards, mechanical strain on terminations, and potential fire route obstruction.",
  },
  {
    id: 8,
    question: "Why is manufacturer guidance important for support spacing?",
    options: [
      "It's legally required in all cases",
      "To ensure cable properties are properly accommodated",
      "To increase installation costs",
      "To make installation more complex",
    ],
    correctAnswer: 1,
    explanation:
      "Manufacturer specifications account for specific cable construction, weight, and mechanical properties that may require adjusted support spacing.",
  },
];

// Inline knowledge checks
const quickCheckQuestions = [
  {
    id: "support-distance",
    question: "Which cable type typically requires the closest support spacing?",
    options: ["SWA cable", "Standard PVC T&E", "Flexible cord", "MICC cable"],
    correctIndex: 2,
    explanation:
      "Flexible cords require the closest spacing (250mm horizontal) due to their stranded construction and tendency to sag.",
  },
  {
    id: "escape-routes",
    question: "Why are non-combustible supports mandatory in escape routes?",
    options: [
      "They look more professional",
      "They're cheaper to install",
      "They prevent cable collapse during fires",
      "They're easier to remove",
    ],
    correctIndex: 2,
    explanation:
      "Non-combustible supports prevent cables from falling and blocking escape routes during fires, as required by BS 7671 Amendment 2.",
  },
  {
    id: "vertical-horizontal",
    question: "Why can vertical cable runs typically have wider support spacing than horizontal?",
    options: [
      "Gravity reduces sideways sagging",
      "Vertical cables carry less current",
      "They're in protected locations",
      "Building codes are less strict",
    ],
    correctIndex: 0,
    explanation:
      "Gravity acts along the cable length in vertical runs, reducing lateral sagging that occurs in horizontal installations.",
  },
];

export default function Module3Section6_1() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="text-white hover:text-white active:text-white p-0 -ml-1 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3.6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <header className="mb-6 sm:mb-8 text-center">
          <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/30 mb-4">
            <span className="text-elec-yellow text-sm font-medium">Module 3.6.1</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Cable Support Distances (Horizontal/Vertical)
          </h1>
          <p className="text-white/80">
            Essential requirements for proper cable support spacing to ensure mechanical stability, BS 7671 compliance, and fire safety in electrical installations.
          </p>
        </header>

        {/* Introduction */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Introduction
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Proper cable support prevents sagging, damage, and termination strain.</li>
                <li>Support distances vary by cable type, weight, and installation method.</li>
                <li>Fire escape routes require non-combustible supports (18th Edition Amendment 2).</li>
                <li>Manufacturer guidance overrides general recommendations where specified.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Cable sag, loose supports, plastic clips in escape routes.</li>
                <li><strong>Use:</strong> 300mm PVC, 450mm SWA, 250mm flex, steel supports in fire routes.</li>
                <li><strong>Check:</strong> Support spacing, fixing security, manufacturer specifications.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Learning Outcomes
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
            <li>State the recommended maximum cable support distances for horizontal and vertical runs.</li>
            <li>Explain the factors that influence cable support spacing requirements.</li>
            <li>Identify correct support methods for different cable types and environments.</li>
            <li>Apply BS 7671 requirements for non-combustible fixings in escape routes.</li>
          </ul>
        </section>

        {/* Content */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Content / Learning
          </h2>

          {/* 1. Purpose and Principles of Cable Support */}
          <div className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Anchor className="w-5 h-5" /> 1. Purpose and Principles of Cable Support
            </h3>

            <div className="mb-6">
              <h4 className="font-medium text-white mb-3">Engineering Principles Behind Cable Support</h4>
              <div className="p-4 bg-transparent border border-border/30 rounded-lg mb-4">
                <p className="text-xs sm:text-sm text-white mb-3">
                  <strong>Mechanical Loading:</strong> Cables act as distributed loads creating bending moments between supports. The maximum sag occurs at mid-span and increases with the square of the span length, making proper spacing critical for maintaining acceptable deflection limits.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-white mb-2">Primary Support Functions</h6>
                    <ul className="space-y-1 text-sm">
                      <li>* <strong>Load distribution:</strong> Transfers cable weight to building structure</li>
                      <li>* <strong>Deflection control:</strong> Maintains acceptable sag within limits</li>
                      <li>* <strong>Strain relief:</strong> Prevents mechanical stress at terminations</li>
                      <li>* <strong>Vibration damping:</strong> Reduces fatigue from building movement</li>
                      <li>* <strong>Thermal stability:</strong> Accommodates expansion/contraction cycles</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-white mb-2">Failure Modes Without Adequate Support</h6>
                    <ul className="space-y-1 text-sm">
                      <li>* <strong>Excessive sag:</strong> Beyond acceptable aesthetic/functional limits</li>
                      <li>* <strong>Termination stress:</strong> Pull-out forces at connections</li>
                      <li>* <strong>Sheath cracking:</strong> Repeated flexing at support points</li>
                      <li>* <strong>Core stretching:</strong> Conductor elongation in vertical runs</li>
                      <li>* <strong>Joint separation:</strong> Mechanical failure at splice points</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-transparent border border-border/30 rounded-lg mb-4">
                <h5 className="font-medium text-elec-yellow mb-3">Fire Safety and Structural Integrity</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-white mb-2">BS 7671 18th Edition Amendment 2 Requirements</h6>
                    <ul className="space-y-1 text-sm">
                      <li>* <strong>Escape route protection:</strong> Non-combustible supports mandatory</li>
                      <li>* <strong>Fire resistance:</strong> Supports must not fail below 750C</li>
                      <li>* <strong>Structural integrity:</strong> Maintain support during evacuation period</li>
                      <li>* <strong>Emergency lighting:</strong> Critical circuit protection priority</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-white mb-2">Regulatory Background</h6>
                    <ul className="space-y-1 text-sm">
                      <li>* <strong>Grenfell Tower:</strong> Highlighted cable support fire safety risks</li>
                      <li>* <strong>Building regulations:</strong> Enhanced fire safety requirements</li>
                      <li>* <strong>Insurance implications:</strong> Non-compliance affects coverage</li>
                      <li>* <strong>Professional liability:</strong> Designer and installer responsibility</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-transparent border border-green-400/30 rounded-lg">
                <h5 className="font-medium text-green-400 mb-3">Inspection and Compliance Considerations</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-white mb-2">Periodic Inspection Points</h6>
                    <ul className="space-y-1 text-sm">
                      <li>* Support fixing security and condition</li>
                      <li>* Cable sag measurement within acceptable limits</li>
                      <li>* Absence of stress at termination points</li>
                      <li>* Material compatibility and corrosion resistance</li>
                      <li>* Compliance with fire safety regulations</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-white mb-2">Documentation Requirements</h6>
                    <ul className="space-y-1 text-sm">
                      <li>* Support specification and spacing calculations</li>
                      <li>* Material certificates for fire-rated applications</li>
                      <li>* Installation test results and validation</li>
                      <li>* Maintenance schedules and inspection records</li>
                      <li>* Compliance statements for special locations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[0]} />
          <div className="my-6 border-t border-white/10" />

          {/* 2. Factors Affecting Support Distance Requirements */}
          <div className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Weight className="w-5 h-5" /> 2. Factors Affecting Support Distance Requirements
            </h3>

            <div className="mb-6">
              <h4 className="font-medium text-white mb-3">Technical Assessment Criteria</h4>
              <div className="p-4 bg-transparent border border-border/30 rounded-lg mb-4">
                <h5 className="font-medium text-elec-yellow mb-3">Cable Physical Properties</h5>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-white/10 text-sm">
                    <thead>
                      <tr className="">
                        <th className="border border-white/10 p-3 text-left">Property</th>
                        <th className="border border-white/10 p-3 text-left">Impact on Support Spacing</th>
                        <th className="border border-white/10 p-3 text-left">Typical Values</th>
                        <th className="border border-white/10 p-3 text-left">Design Consideration</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-white/10 p-3"><strong>Cable Weight</strong></td>
                        <td className="border border-white/10 p-3">Heavier = closer spacing required</td>
                        <td className="border border-white/10 p-3">1.5-15 kg/m depending on size</td>
                        <td className="border border-white/10 p-3">Linear loading calculation</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-white/10 p-3"><strong>Overall Diameter</strong></td>
                        <td className="border border-white/10 p-3">Larger diameter = greater sag</td>
                        <td className="border border-white/10 p-3">6mm to 100mm+ typical</td>
                        <td className="border border-white/10 p-3">Moment of inertia effects</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 p-3"><strong>Sheath Stiffness</strong></td>
                        <td className="border border-white/10 p-3">Flexible = more support needed</td>
                        <td className="border border-white/10 p-3">Varies by material/construction</td>
                        <td className="border border-white/10 p-3">Modulus of elasticity</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-white/10 p-3"><strong>Temperature Rating</strong></td>
                        <td className="border border-white/10 p-3">High temp = thermal expansion</td>
                        <td className="border border-white/10 p-3">70C to 90C typical</td>
                        <td className="border border-white/10 p-3">Expansion coefficient</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 p-3"><strong>Armouring</strong></td>
                        <td className="border border-white/10 p-3">Armoured = wider spacing possible</td>
                        <td className="border border-white/10 p-3">SWA, AWA, braided screen</td>
                        <td className="border border-white/10 p-3">Mechanical strength increase</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 bg-transparent border border-amber-400/30 rounded-lg mb-4">
                <h5 className="font-medium text-amber-400 mb-3">Environmental and Installation Factors</h5>
                <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                  <div>
                    <h6 className="font-medium text-white mb-2">Temperature Effects</h6>
                    <ul className="space-y-1 text-sm">
                      <li>* <strong>Thermal cycling:</strong> Daily heating/cooling stress</li>
                      <li>* <strong>Material degradation:</strong> UV and ozone effects</li>
                      <li>* <strong>Expansion coefficients:</strong> PVC 8x10-5/C, XLPE 2x10-4/C</li>
                      <li>* <strong>Cold weather brittleness:</strong> Increased support needs</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-white mb-2">Mechanical Environment</h6>
                    <ul className="space-y-1 text-sm">
                      <li>* <strong>Vibration sources:</strong> Machinery, traffic, wind</li>
                      <li>* <strong>Dynamic loading:</strong> Short-circuit fault currents</li>
                      <li>* <strong>Building movement:</strong> Settlement, thermal, seismic</li>
                      <li>* <strong>Access requirements:</strong> Maintenance and alteration</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-white mb-2">Chemical and Moisture</h6>
                    <ul className="space-y-1 text-sm">
                      <li>* <strong>Corrosive atmospheres:</strong> Support material selection</li>
                      <li>* <strong>Humidity cycles:</strong> Dimensional changes</li>
                      <li>* <strong>Chemical compatibility:</strong> Support/cable interaction</li>
                      <li>* <strong>Water absorption:</strong> Weight increase over time</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-transparent border border-cyan-400/30 rounded-lg">
                <h5 className="font-medium text-cyan-400 mb-3">Special Installation Considerations</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-white mb-2">High-Risk Locations</h6>
                    <ul className="space-y-1 text-sm">
                      <li>* <strong>Fire escape routes:</strong> Non-combustible supports mandatory</li>
                      <li>* <strong>Public areas:</strong> Enhanced mechanical protection</li>
                      <li>* <strong>Industrial environments:</strong> Vibration and chemical resistance</li>
                      <li>* <strong>Outdoor installations:</strong> Weather and UV protection</li>
                      <li>* <strong>Hazardous areas:</strong> Explosion-proof support systems</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-white mb-2">Cable Bundling Effects</h6>
                    <ul className="space-y-1 text-sm">
                      <li>* <strong>Grouped cables:</strong> Combined weight considerations</li>
                      <li>* <strong>Thermal effects:</strong> Heat buildup in bundles</li>
                      <li>* <strong>Segregation requirements:</strong> Different voltage levels</li>
                      <li>* <strong>EMC considerations:</strong> Power and data separation</li>
                      <li>* <strong>Future expansion:</strong> Additional cable accommodation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[1]} />
          <div className="my-6 border-t border-white/10" />

          {/* 3. Standard Support Distances and Methods */}
          <div className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Ruler className="w-5 h-5" /> 3. Standard Support Distances and Installation Methods
            </h3>

            <div className="mb-6">
              <h4 className="font-medium text-white mb-3">Industry Standard Support Distances</h4>
              <div className="p-4 bg-transparent border border-green-400/30 rounded-lg mb-4">
                <h5 className="font-medium text-green-400 mb-3">Maximum Recommended Support Spacings</h5>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-white/10 text-sm">
                    <thead>
                      <tr className="">
                        <th className="border border-white/10 p-3 text-left">Cable Type</th>
                        <th className="border border-white/10 p-3 text-left">Horizontal Spacing</th>
                        <th className="border border-white/10 p-3 text-left">Vertical Spacing</th>
                        <th className="border border-white/10 p-3 text-left">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-white/10 p-3"><strong>PVC T&E (2.5-6mm2)</strong></td>
                        <td className="border border-white/10 p-3">300mm</td>
                        <td className="border border-white/10 p-3">400mm</td>
                        <td className="border border-white/10 p-3">Standard domestic installation</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-white/10 p-3"><strong>PVC T&E (10mm2 and above)</strong></td>
                        <td className="border border-white/10 p-3">250mm</td>
                        <td className="border border-white/10 p-3">350mm</td>
                        <td className="border border-white/10 p-3">Heavier cables need closer spacing</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 p-3"><strong>SWA Cable (up to 35mm2)</strong></td>
                        <td className="border border-white/10 p-3">450mm</td>
                        <td className="border border-white/10 p-3">600mm</td>
                        <td className="border border-white/10 p-3">Armour provides mechanical strength</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-white/10 p-3"><strong>SWA Cable (50mm2 and above)</strong></td>
                        <td className="border border-white/10 p-3">350mm</td>
                        <td className="border border-white/10 p-3">500mm</td>
                        <td className="border border-white/10 p-3">Increased weight requires closer support</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 p-3"><strong>Flexible Cord/Cable</strong></td>
                        <td className="border border-white/10 p-3">250mm</td>
                        <td className="border border-white/10 p-3">300mm</td>
                        <td className="border border-white/10 p-3">Stranded construction more flexible</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-white/10 p-3"><strong>FP200 Fire Cable</strong></td>
                        <td className="border border-white/10 p-3">300mm</td>
                        <td className="border border-white/10 p-3">400mm</td>
                        <td className="border border-white/10 p-3">Similar to standard PVC but fire rated</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 p-3"><strong>MICC Cable</strong></td>
                        <td className="border border-white/10 p-3">600mm</td>
                        <td className="border border-white/10 p-3">800mm</td>
                        <td className="border border-white/10 p-3">Rigid construction allows wider spacing</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 bg-transparent border border-border/30 rounded-lg mb-4">
                <h5 className="font-medium text-elec-yellow mb-3">Support Methods and Hardware Selection</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-white mb-2">Domestic and Light Commercial</h6>
                    <ul className="space-y-1 text-sm">
                      <li>* <strong>Plastic clips:</strong> Standard T&E, indoor use only</li>
                      <li>* <strong>Metal saddles:</strong> Fire routes, enhanced durability</li>
                      <li>* <strong>Cable ties with clips:</strong> Bundled cables, temporary runs</li>
                      <li>* <strong>Adhesive clips:</strong> Masonry fixing, appropriate substrates</li>
                      <li>* <strong>Nail-in clips:</strong> Timber frame construction</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-white mb-2">Industrial and Heavy Duty</h6>
                    <ul className="space-y-1 text-sm">
                      <li>* <strong>Steel cleats:</strong> SWA termination and support</li>
                      <li>* <strong>Cable trays:</strong> Multiple cable support systems</li>
                      <li>* <strong>Beam clamps:</strong> Structural steel mounting</li>
                      <li>* <strong>Threaded rod systems:</strong> Suspended installations</li>
                      <li>* <strong>Explosion-proof supports:</strong> Hazardous area applications</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 overflow-x-auto">
                  <table className="w-full border-collapse border border-white/10 text-sm">
                    <thead>
                      <tr className="">
                        <th className="border border-white/10 p-3 text-left">Support Type</th>
                        <th className="border border-white/10 p-3 text-left">Material</th>
                        <th className="border border-white/10 p-3 text-left">Fire Rating</th>
                        <th className="border border-white/10 p-3 text-left">Typical Applications</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-white/10 p-3">Standard Plastic Clip</td>
                        <td className="border border-white/10 p-3">Nylon/ABS</td>
                        <td className="border border-white/10 p-3">Not fire rated</td>
                        <td className="border border-white/10 p-3">Domestic, non-escape routes</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-white/10 p-3">Metal Saddle Clip</td>
                        <td className="border border-white/10 p-3">Steel/Stainless</td>
                        <td className="border border-white/10 p-3">Non-combustible</td>
                        <td className="border border-white/10 p-3">Fire escape routes, industrial</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 p-3">SWA Cleat</td>
                        <td className="border border-white/10 p-3">Cast iron/steel</td>
                        <td className="border border-white/10 p-3">Non-combustible</td>
                        <td className="border border-white/10 p-3">Armoured cable termination</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-white/10 p-3">Cable Tray</td>
                        <td className="border border-white/10 p-3">Galvanised steel</td>
                        <td className="border border-white/10 p-3">Non-combustible</td>
                        <td className="border border-white/10 p-3">Multiple cable installations</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 bg-transparent border border-border/30 rounded-lg">
                <h5 className="font-medium text-elec-yellow mb-3">Installation Best Practices</h5>
                <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                  <div>
                    <h6 className="font-medium text-white mb-2">Planning and Layout</h6>
                    <ul className="space-y-1 text-sm">
                      <li>* Mark support positions before cable pulling</li>
                      <li>* Check structural adequacy of mounting surface</li>
                      <li>* Plan for cable expansion and future access</li>
                      <li>* Consider segregation requirements between circuits</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-white mb-2">Installation Techniques</h6>
                    <ul className="space-y-1 text-sm">
                      <li>* Use appropriate fixings for substrate material</li>
                      <li>* Avoid over-tightening causing cable deformation</li>
                      <li>* Ensure adequate bend radius at support points</li>
                      <li>* Check cable alignment after installation</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-white mb-2">Quality Control</h6>
                    <ul className="space-y-1 text-sm">
                      <li>* Verify support spacing with measuring tape</li>
                      <li>* Check fixing torques and security</li>
                      <li>* Inspect for cable damage during installation</li>
                      <li>* Document any deviations from standard spacing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[2]} />
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-transparent border border-white/10 rounded-lg">
              <h3 className="font-medium text-white mb-2">Q: Can cable ties be used as the only fixing method in escape routes?</h3>
              <p className="text-xs sm:text-sm text-white">
                A: No. Cable ties must be used in conjunction with non-combustible supports. They can group cables but cannot be the primary support method in fire escape routes.
              </p>
            </div>
            <div className="p-4 bg-transparent border border-white/10 rounded-lg">
              <h3 className="font-medium text-white mb-2">Q: Do vertical runs always need less support than horizontal runs?</h3>
              <p className="text-xs sm:text-sm text-white">
                A: No. While vertical spacing can often be wider due to gravity effects, heavy cables may require closer spacing to prevent conductor stretching and sheath stress.
              </p>
            </div>
            <div className="p-4 bg-transparent border border-white/10 rounded-lg">
              <h3 className="font-medium text-white mb-2">Q: Should support distances be closer than recommended?</h3>
              <p className="text-xs sm:text-sm text-white">
                A: Yes, closer spacing is advisable for cables under mechanical stress, subject to vibration, installed in harsh conditions, or when manufacturer guidance specifies it.
              </p>
            </div>
            <div className="p-4 bg-transparent border border-white/10 rounded-lg">
              <h3 className="font-medium text-white mb-2">Q: What happens if I exceed maximum support distances?</h3>
              <p className="text-xs sm:text-sm text-white">
                A: Excessive spacing can cause non-compliance with BS 7671, inspection failures, cable damage, termination stress, and potential safety hazards including fire route obstruction.
              </p>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Summary
          </h2>
          <div className="p-4 bg-transparent border-l-2 border-elec-yellow rounded-lg border border-white/10">
            <p className="text-white/90">
              Proper cable support distances are fundamental to electrical installation safety and compliance. Understanding cable properties, environmental factors, and regulatory requirements enables correct selection of support spacing and methods. Fire safety regulations mandate non-combustible supports in escape routes, reflecting the critical importance of maintaining electrical system integrity during emergencies.
            </p>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Quiz (8 Questions)
          </h2>
          <Quiz questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <div className="flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-8 border-t border-white/10">
          <Button variant="outline" className="min-h-[44px] touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3.6
            </Link>
          </Button>
          <Button className="min-h-[44px] touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../6-2">
              Next: Cable Routing Zones
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
