import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Layers,
  Home,
  Drill,
} from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE =
  "Routing Cables in Walls and Floors (Zones and Depths) - Module 3.6.2 | Level 2 Electrical Course";
const DESCRIPTION =
  "Master BS 7671 safe zones and depth requirements for concealed cable routing. Learn to prevent accidental damage and ensure compliance with electrical safety regulations.";

// End-of-section quiz (8 questions)
const quizQuestions = [
  {
    id: 1,
    question: "How far from the wall corner is a vertical safe zone?",
    options: ["100 mm", "150 mm", "200 mm", "250 mm"],
    correctAnswer: 1,
    explanation:
      "Vertical safe zones extend 150mm from wall corners (internal or external) as specified in BS 7671 to provide predictable cable locations.",
  },
  {
    id: 2,
    question: "True or False: Horizontal safe zones apply only to internal walls.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. BS 7671 safe zones apply to both internal and external walls to ensure consistent cable protection throughout the building.",
  },
  {
    id: 3,
    question: "What is the minimum depth for an unprotected cable outside a safe zone?",
    options: ["25 mm", "35 mm", "50 mm", "75 mm"],
    correctAnswer: 2,
    explanation:
      "Cables outside safe zones must be buried at least 50mm deep from the surface to provide adequate protection from accidental penetration.",
  },
  {
    id: 4,
    question: "Name one type of mechanical protection for cables.",
    options: [
      "Steel conduit or trunking",
      "Plastic cable ties",
      "Electrical tape",
      "Paint marking",
    ],
    correctAnswer: 0,
    explanation:
      "Steel conduit, trunking, or SWA cable provide mechanical protection allowing cables to be routed outside safe zones safely.",
  },
  {
    id: 5,
    question: "What safe zone is directly above a socket outlet?",
    options: ["Vertical", "Horizontal", "Ceiling line zone", "None"],
    correctAnswer: 0,
    explanation:
      "A vertical safe zone extends directly above (and below) any electrical accessory to the ceiling or floor level.",
  },
  {
    id: 6,
    question: "Which regulation defines safe zones?",
    options: ["BS 5839", "BS 7671", "BS EN 60529", "BS 5266"],
    correctAnswer: 1,
    explanation:
      "BS 7671 (IET Wiring Regulations) defines safe zones for concealed cables in Section 522 to prevent accidental damage.",
  },
  {
    id: 7,
    question: "Why is it dangerous to route cables diagonally in walls?",
    options: [
      "They use more cable",
      "They are unpredictable and likely to be drilled into",
      "They look untidy",
      "They cost more to install",
    ],
    correctAnswer: 1,
    explanation:
      "Diagonal routing is unpredictable - people assume cables follow safe zones and may drill into walls expecting no cables in diagonal areas.",
  },
  {
    id: 8,
    question: "What is one additional requirement for cables routed outside safe zones in a bathroom?",
    options: [
      "Use bigger cables",
      "Paint them white",
      "Compliance with bathroom zoning requirements",
      "Install at head height",
    ],
    correctAnswer: 2,
    explanation:
      "Bathroom cables must comply with both safe zone requirements AND bathroom zoning regulations (BS 7671 Section 701).",
  },
];

// Inline knowledge checks
const quickCheckQuestions = [
  {
    id: "safe-zones",
    question: "How far from the ceiling line is a recognised safe zone?",
    options: ["100 mm", "150 mm", "200 mm", "300 mm"],
    correctIndex: 1,
    explanation:
      "Safe zones extend 150mm from the ceiling line (top of wall) where cables are expected and can be safely concealed.",
  },
  {
    id: "burial-depth",
    question: "What is the minimum burial depth for an unprotected cable outside a safe zone?",
    options: ["25 mm", "50 mm", "75 mm", "100 mm"],
    correctIndex: 1,
    explanation:
      "Cables outside safe zones must be buried at least 50mm deep to provide adequate protection from accidental penetration by nails or screws.",
  },
  {
    id: "protection-methods",
    question: "Name one method of protecting a cable outside a safe zone.",
    options: ["Paint marking", "Steel conduit protection", "Plastic covering", "Warning stickers"],
    correctIndex: 1,
    explanation:
      "Steel conduit, trunking, or armoured cable provides mechanical protection allowing safe installation outside designated safe zones.",
  },
];

export default function Module3Section6_2() {
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
            <span className="text-elec-yellow text-sm font-medium">Module 3.6.2</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Routing Cables in Walls and Floors (Zones and Depths)
          </h1>
          <p className="text-white/80">
            Understanding BS 7671 safe zones and depth requirements for concealed cable routing to prevent accidental damage and ensure electrical safety compliance.
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
                <li>Safe zones define predictable areas where concealed cables may be present.</li>
                <li>Cables outside safe zones need 50mm depth or mechanical protection.</li>
                <li>Incorrect routing causes most electrical accidents during building work.</li>
                <li>BS 7671 specifies clear rules to prevent accidental cable damage.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Diagonal routes, shallow depths, unprotected cables outside zones.</li>
                <li><strong>Use:</strong> 150mm safe zones, 50mm minimum depth, steel conduit protection.</li>
                <li><strong>Check:</strong> Zone compliance, burial depth, mechanical protection adequacy.</li>
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
            <li>Identify the prescribed safe zones for cable routing in walls and ceilings.</li>
            <li>State the permitted depths for buried cables without additional protection.</li>
            <li>Apply protective measures when cables are installed outside safe zones.</li>
            <li>Understand the importance of accurate routing for future inspection and maintenance.</li>
          </ul>
        </section>

        {/* Content */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Content / Learning
          </h2>

          {/* 1. Safe Zones in Walls and Ceilings */}
          <div className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Home className="w-5 h-5" /> 1. Safe Zones in Walls and Ceilings (BS 7671 Section 522)
            </h3>

            <div className="mb-6">
              <h4 className="font-medium text-white mb-3">Understanding Safe Zone Principles</h4>
              <div className="p-4 bg-transparent border border-border/30 rounded-lg mb-4">
                <p className="text-xs sm:text-sm text-white mb-3">
                  <strong>Safe Zone Philosophy:</strong> Safe zones are predetermined areas where cables are expected to be present. Anyone working on a building should assume cables exist in these zones and take appropriate precautions. This predictability is the key to preventing accidental damage during maintenance, renovation, or decoration work.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-white mb-2">Zone Definition Criteria</h6>
                    <ul className="space-y-1 text-sm">
                      <li>* <strong>Logical routing paths:</strong> Direct connections between accessories</li>
                      <li>* <strong>Structural boundaries:</strong> Related to building geometry</li>
                      <li>* <strong>Visual indicators:</strong> Connected to visible electrical accessories</li>
                      <li>* <strong>Practical installation:</strong> Easy cable pulling routes</li>
                      <li>* <strong>Future identification:</strong> Predictable for maintenance work</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-white mb-2">Historical Development</h6>
                    <ul className="space-y-1 text-sm">
                      <li>* <strong>Pre-regulation era:</strong> Random cable routing caused injuries</li>
                      <li>* <strong>Industry feedback:</strong> Building trades requested predictable zones</li>
                      <li>* <strong>European harmonisation:</strong> Consistent with CENELEC standards</li>
                      <li>* <strong>Practical experience:</strong> Refined through real-world application</li>
                      <li>* <strong>Current best practice:</strong> Widely adopted across trades</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-transparent border border-green-400/30 rounded-lg mb-4">
                <h5 className="font-medium text-green-400 mb-3">Vertical Safe Zones - Detailed Specifications</h5>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-white/10 text-sm">
                    <thead>
                      <tr className="">
                        <th className="border border-white/10 p-3 text-left">Zone Type</th>
                        <th className="border border-white/10 p-3 text-left">Location</th>
                        <th className="border border-white/10 p-3 text-left">Width</th>
                        <th className="border border-white/10 p-3 text-left">Height Extent</th>
                        <th className="border border-white/10 p-3 text-left">Typical Applications</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-white/10 p-3"><strong>Ceiling Line Zone</strong></td>
                        <td className="border border-white/10 p-3">From ceiling/wall junction</td>
                        <td className="border border-white/10 p-3">150mm down from ceiling</td>
                        <td className="border border-white/10 p-3">Horizontal around room</td>
                        <td className="border border-white/10 p-3">Lighting circuits, ceiling feeds</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-white/10 p-3"><strong>Corner Zone</strong></td>
                        <td className="border border-white/10 p-3">Internal/external corners</td>
                        <td className="border border-white/10 p-3">150mm from corner angle</td>
                        <td className="border border-white/10 p-3">Full height floor to ceiling</td>
                        <td className="border border-white/10 p-3">Distribution feeds, riser cables</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 p-3"><strong>Accessory Zone</strong></td>
                        <td className="border border-white/10 p-3">Above/below accessories</td>
                        <td className="border border-white/10 p-3">Within accessory width</td>
                        <td className="border border-white/10 p-3">To ceiling or floor level</td>
                        <td className="border border-white/10 p-3">Socket feeds, switch drops</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-white/10 p-3"><strong>Floor Line Zone</strong></td>
                        <td className="border border-white/10 p-3">From floor/wall junction</td>
                        <td className="border border-white/10 p-3">150mm up from floor</td>
                        <td className="border border-white/10 p-3">Horizontal around room</td>
                        <td className="border border-white/10 p-3">Underfloor heating, skirting outlets</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 grid md:grid-cols-2 gap-4">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <h6 className="font-medium text-white mb-2">Measurement Rules</h6>
                    <ul className="space-y-1 text-sm">
                      <li>* Measure from finished surface, not structural elements</li>
                      <li>* Include plaster, tile, or decorative finishes in measurements</li>
                      <li>* Zone width remains constant regardless of wall thickness</li>
                      <li>* Both sides of a wall have separate safe zones</li>
                      <li>* Suspended ceilings do not create new ceiling line zones</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <h6 className="font-medium text-white mb-2">Special Considerations</h6>
                    <ul className="space-y-1 text-sm">
                      <li>* Sloped ceilings: zones follow the ceiling line angle</li>
                      <li>* Stairwells: zones continue up/down the sloped surfaces</li>
                      <li>* Arched openings: zones follow the architectural profile</li>
                      <li>* Bay windows: each wall section has its own zones</li>
                      <li>* Alcoves and recesses: treated as separate wall surfaces</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-transparent border border-border/30 rounded-lg mb-4">
                <h5 className="font-medium text-elec-yellow mb-3">Horizontal Safe Zones and Cross-Connections</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-white mb-2">Horizontal Zone Applications</h6>
                    <ul className="space-y-1 text-sm">
                      <li>* <strong>Accessory interconnection:</strong> Direct horizontal routes between accessories</li>
                      <li>* <strong>Ring circuit routing:</strong> Horizontal paths around room perimeter</li>
                      <li>* <strong>Switch drop connections:</strong> From ceiling lights to wall switches</li>
                      <li>* <strong>Multi-gang accessory feeds:</strong> Between adjacent mounting positions</li>
                      <li>* <strong>Data and power separation:</strong> Dedicated horizontal cable routes</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-white mb-2">Zone Intersection Rules</h6>
                    <ul className="space-y-1 text-sm">
                      <li>* <strong>Overlapping zones:</strong> Cable can be placed in intersection areas</li>
                      <li>* <strong>Zone boundaries:</strong> Cables must remain within defined limits</li>
                      <li>* <strong>Change of direction:</strong> Only at zone intersections or corners</li>
                      <li>* <strong>Multiple circuits:</strong> Segregation requirements still apply</li>
                      <li>* <strong>Future expansion:</strong> Consider space for additional circuits</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-white/5 rounded-lg">
                  <h6 className="font-medium text-white mb-2">Real-World Zone Mapping Exercise</h6>
                  <p className="text-xs sm:text-sm text-white mb-2">
                    <strong>Example Room Analysis:</strong> A typical 4m x 3m room with a door, window, and electrical accessories.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-1 text-sm">
                      <li>* Socket outlet at 450mm height: vertical zone to ceiling and floor</li>
                      <li>* Light switch at 1.2m height: vertical zone and horizontal to socket</li>
                      <li>* Room corners: 150mm zones on both adjoining walls</li>
                      <li>* Ceiling junction: 150mm zone around entire room perimeter</li>
                    </ul>
                    <ul className="space-y-1 text-sm">
                      <li>* Window area: zones continue behind reveals and sills</li>
                      <li>* Door opening: zones terminate at structural opening</li>
                      <li>* Available safe routing: approximately 30% of wall area</li>
                      <li>* Planning requirement: cable layout before building work</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[0]} />
          <div className="my-6 border-t border-white/10" />

          {/* 2. Depth Requirements and Protection Methods */}
          <div className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Layers className="w-5 h-5" /> 2. Depth Requirements and Protection Methods
            </h3>

            <div className="mb-6">
              <h4 className="font-medium text-white mb-3">Engineering Basis for Depth Requirements</h4>
              <div className="p-4 bg-transparent border border-amber-400/30 rounded-lg mb-4">
                <h5 className="font-medium text-amber-400 mb-3">Penetration Risk Analysis</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-white mb-2">Common Penetration Hazards</h6>
                    <ul className="space-y-1 text-sm">
                      <li>* <strong>Picture fixing:</strong> 25-40mm typical screw/nail penetration</li>
                      <li>* <strong>Shelf brackets:</strong> 50-75mm rawlplug and screw depth</li>
                      <li>* <strong>TV wall mounts:</strong> 60-100mm heavy-duty fixing depth</li>
                      <li>* <strong>Kitchen units:</strong> 40-60mm cabinet fixing screws</li>
                      <li>* <strong>Plasterboard drilling:</strong> 30-50mm typical overrun depth</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-white mb-2">Statistical Safety Analysis</h6>
                    <ul className="space-y-1 text-sm">
                      <li>* <strong>50mm minimum:</strong> Protects against 95% of penetrations</li>
                      <li>* <strong>25mm depth:</strong> Only 60% protection level</li>
                      <li>* <strong>75mm depth:</strong> 99% protection but impractical</li>
                      <li>* <strong>Accident data:</strong> Most strikes occur 20-45mm depth</li>
                      <li>* <strong>Cost-benefit:</strong> 50mm provides optimal protection/practicality</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-transparent border border-border/30 rounded-lg mb-4">
                <h5 className="font-medium text-elec-yellow mb-3">Protection Methods for Non-Compliant Routing</h5>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-white/10 text-sm">
                    <thead>
                      <tr className="">
                        <th className="border border-white/10 p-3 text-left">Protection Method</th>
                        <th className="border border-white/10 p-3 text-left">Applications</th>
                        <th className="border border-white/10 p-3 text-left">Effectiveness</th>
                        <th className="border border-white/10 p-3 text-left">Installation Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-white/10 p-3"><strong>Steel Conduit</strong></td>
                        <td className="border border-white/10 p-3">Individual cable protection</td>
                        <td className="border border-white/10 p-3">Excellent mechanical protection</td>
                        <td className="border border-white/10 p-3">Requires earthing, expansion joints</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-white/10 p-3"><strong>Steel Trunking</strong></td>
                        <td className="border border-white/10 p-3">Multiple cable runs</td>
                        <td className="border border-white/10 p-3">High protection level</td>
                        <td className="border border-white/10 p-3">Good for cable segregation</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 p-3"><strong>SWA Cable</strong></td>
                        <td className="border border-white/10 p-3">Direct burial applications</td>
                        <td className="border border-white/10 p-3">Self-protecting armour</td>
                        <td className="border border-white/10 p-3">Requires appropriate termination</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-white/10 p-3"><strong>RCD Protection</strong></td>
                        <td className="border border-white/10 p-3">Supplementary protection</td>
                        <td className="border border-white/10 p-3">Reduces shock risk</td>
                        <td className="border border-white/10 p-3">30mA or less, does not prevent damage</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 p-3"><strong>Plastic Capping</strong></td>
                        <td className="border border-white/10 p-3">Visual warning only</td>
                        <td className="border border-white/10 p-3">Limited protection</td>
                        <td className="border border-white/10 p-3">Not acceptable as sole protection</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 bg-transparent border border-cyan-400/30 rounded-lg">
                <h5 className="font-medium text-cyan-400 mb-3">Installation Depth Measurement and Verification</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-white mb-2">Measurement Techniques</h6>
                    <ul className="space-y-1 text-sm">
                      <li>* <strong>Surface reference:</strong> Measure from final finished surface</li>
                      <li>* <strong>Multi-layer walls:</strong> Consider plaster, tiles, cladding</li>
                      <li>* <strong>Cable diameter:</strong> Measure to nearest surface of cable</li>
                      <li>* <strong>Conduit systems:</strong> Measure to outer surface of protection</li>
                      <li>* <strong>Documentation:</strong> Record actual depths during installation</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-white mb-2">Verification Methods</h6>
                    <ul className="space-y-1 text-sm">
                      <li>* <strong>Physical measurement:</strong> Depth gauge during installation</li>
                      <li>* <strong>Cable detection:</strong> Electronic locators for verification</li>
                      <li>* <strong>Photographic records:</strong> Document before wall closure</li>
                      <li>* <strong>As-built drawings:</strong> Mark actual cable positions</li>
                      <li>* <strong>Handover documentation:</strong> Provide depth confirmation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[1]} />
          <div className="my-6 border-t border-white/10" />

          {/* 3. Floor and Ceiling Routing Considerations */}
          <div className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Drill className="w-5 h-5" /> 3. Floor and Ceiling Routing Considerations
            </h3>

            <div className="mb-6">
              <h4 className="font-medium text-white mb-3">Structural Integration and Protection</h4>
              <div className="p-4 bg-transparent border border-green-400/30 rounded-lg mb-4">
                <h5 className="font-medium text-green-400 mb-3">Floor Construction Methods and Cable Routing</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-white mb-2">Suspended Timber Floors</h6>
                    <ul className="space-y-1 text-sm">
                      <li>* <strong>Above joists:</strong> Route in notches or above top surface</li>
                      <li>* <strong>Through joists:</strong> Drill at neutral axis (mid-depth)</li>
                      <li>* <strong>Hole diameter:</strong> Maximum 0.25 x joist depth</li>
                      <li>* <strong>Hole position:</strong> Between 0.25 and 0.4 x span from support</li>
                      <li>* <strong>Multiple holes:</strong> Minimum 3 x hole diameter spacing</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-white mb-2">Concrete Floor Systems</h6>
                    <ul className="space-y-1 text-sm">
                      <li>* <strong>Screed routing:</strong> Install before concrete pour</li>
                      <li>* <strong>Conduit protection:</strong> Prevent concrete ingress</li>
                      <li>* <strong>Expansion joints:</strong> Accommodate building movement</li>
                      <li>* <strong>Reinforcement coordination:</strong> Avoid structural steel conflict</li>
                      <li>* <strong>Load bearing:</strong> Consider heavy equipment loading</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 overflow-x-auto">
                  <table className="w-full border-collapse border border-white/10 text-sm">
                    <thead>
                      <tr className="">
                        <th className="border border-white/10 p-3 text-left">Floor Type</th>
                        <th className="border border-white/10 p-3 text-left">Preferred Route</th>
                        <th className="border border-white/10 p-3 text-left">Protection Required</th>
                        <th className="border border-white/10 p-3 text-left">Special Considerations</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-white/10 p-3">Suspended Timber</td>
                        <td className="border border-white/10 p-3">Above joists in notches</td>
                        <td className="border border-white/10 p-3">Steel plates over notches</td>
                        <td className="border border-white/10 p-3">Structural integrity maintained</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-white/10 p-3">Concrete Slab</td>
                        <td className="border border-white/10 p-3">Conduit in screed layer</td>
                        <td className="border border-white/10 p-3">Heavy-duty conduit</td>
                        <td className="border border-white/10 p-3">Install before concrete pour</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 p-3">Raised Access Floor</td>
                        <td className="border border-white/10 p-3">Under floor void</td>
                        <td className="border border-white/10 p-3">Cable tray/basket</td>
                        <td className="border border-white/10 p-3">Services segregation required</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-white/10 p-3">Beam and Block</td>
                        <td className="border border-white/10 p-3">Service ducts/voids</td>
                        <td className="border border-white/10 p-3">Designated service routes</td>
                        <td className="border border-white/10 p-3">Coordinate with structure</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 bg-transparent border border-border/30 rounded-lg mb-4">
                <h5 className="font-medium text-elec-yellow mb-3">Ceiling and Roof Space Applications</h5>
                <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                  <div>
                    <h6 className="font-medium text-white mb-2">Suspended Ceilings</h6>
                    <ul className="space-y-1 text-sm">
                      <li>* Cable tray systems above grid</li>
                      <li>* Fire-rated cable support in plenum</li>
                      <li>* Accessible for maintenance</li>
                      <li>* Weight loading on ceiling grid</li>
                      <li>* Services coordination required</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-white mb-2">Roof Space Routing</h6>
                    <ul className="space-y-1 text-sm">
                      <li>* Avoid laying on insulation</li>
                      <li>* Route away from foot traffic areas</li>
                      <li>* Consider thermal effects</li>
                      <li>* Protection from stored items</li>
                      <li>* Clear identification markings</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-white mb-2">Service Integration</h6>
                    <ul className="space-y-1 text-sm">
                      <li>* Coordinate with HVAC systems</li>
                      <li>* Maintain fire compartmentation</li>
                      <li>* Segregate power and data services</li>
                      <li>* Plan for future service additions</li>
                      <li>* Document routing for maintenance</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-transparent border border-border/30 rounded-lg">
                <h5 className="font-medium text-elec-yellow mb-3">Special Location Considerations</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-white mb-2">Bathroom and Wet Area Routing</h6>
                    <ul className="space-y-1 text-sm">
                      <li>* <strong>Zone compliance:</strong> Routes must respect bathroom zones</li>
                      <li>* <strong>Waterproof protection:</strong> IP-rated cable glands</li>
                      <li>* <strong>Indirect routing:</strong> Avoid direct paths through wet zones</li>
                      <li>* <strong>RCD protection:</strong> Required for all circuits in bathroom</li>
                      <li>* <strong>Equipotential bonding:</strong> Cable routes to bonding points</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-white mb-2">Commercial and Industrial Routing</h6>
                    <ul className="space-y-1 text-sm">
                      <li>* <strong>Surface containment:</strong> Preferred over concealed routing</li>
                      <li>* <strong>Cable segregation:</strong> Power, data, control system separation</li>
                      <li>* <strong>Access requirements:</strong> Maintenance and modification needs</li>
                      <li>* <strong>Fire protection:</strong> Enhanced fire stopping requirements</li>
                      <li>* <strong>Expansion capability:</strong> Space for additional circuits</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-white/5 rounded-lg">
                  <h6 className="font-medium text-white mb-2">Case Study: Multi-Storey Office Building</h6>
                  <p className="text-xs sm:text-sm text-white mb-2">
                    <strong>Project Requirements:</strong> 4-storey office with mixed services and future flexibility needs.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-1 text-sm">
                      <li>* <strong>Riser strategy:</strong> Dedicated service shafts on each floor</li>
                      <li>* <strong>Horizontal distribution:</strong> Raised floor and ceiling voids</li>
                      <li>* <strong>Zone planning:</strong> Power and data service zones</li>
                      <li>* <strong>Fire compartmentation:</strong> Fire-stopped penetrations</li>
                    </ul>
                    <ul className="space-y-1 text-sm">
                      <li>* <strong>Access planning:</strong> Removable ceiling panels at key points</li>
                      <li>* <strong>Future-proofing:</strong> 40% spare capacity in all routes</li>
                      <li>* <strong>Documentation:</strong> CAD drawings with service coordinates</li>
                      <li>* <strong>Compliance:</strong> BS 7671 and building regulations integration</li>
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
              <h3 className="font-medium text-white mb-2">Q: Are safe zones the same for internal and external walls?</h3>
              <p className="text-xs sm:text-sm text-white">
                A: Yes. BS 7671 applies safe zones to both internal and external walls to ensure consistent protection regardless of wall type or construction method.
              </p>
            </div>
            <div className="p-4 bg-transparent border border-white/10 rounded-lg">
              <h3 className="font-medium text-white mb-2">Q: Does an RCD make it safe to route cables anywhere?</h3>
              <p className="text-xs sm:text-sm text-white">
                A: No. RCD protection reduces shock risk but does not prevent cable damage. Cables must still be in safe zones or mechanically protected - RCD is supplementary protection only.
              </p>
            </div>
            <div className="p-4 bg-transparent border border-white/10 rounded-lg">
              <h3 className="font-medium text-white mb-2">Q: Can safe zones be ignored in industrial wiring?</h3>
              <p className="text-xs sm:text-sm text-white">
                A: No. While industrial installations often use surface containment instead of concealed wiring, safe zone principles still apply where cables are concealed in walls or floors.
              </p>
            </div>
            <div className="p-4 bg-transparent border border-white/10 rounded-lg">
              <h3 className="font-medium text-white mb-2">Q: What if I need to route diagonally between accessories?</h3>
              <p className="text-xs sm:text-sm text-white">
                A: Diagonal routing is prohibited as it's unpredictable. Use vertical and horizontal safe zone routes, even if this requires more cable length and installation time.
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
              Safe zones and correct burial depths are fundamental to preventing accidental cable damage during building work. BS 7671 defines clear rules for concealed cable routing that balance installation practicality with long-term safety. Understanding and applying these requirements protects both the electrical installation and future building occupants from the hazards of accidental cable strikes.
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
            <Link to="../6-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Cable Support Distances
            </Link>
          </Button>
          <Button className="min-h-[44px] touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../6-3">
              Next: Fire Stopping
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
