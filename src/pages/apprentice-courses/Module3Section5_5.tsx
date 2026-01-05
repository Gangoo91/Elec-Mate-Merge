import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Zap,
  Droplets,
  Cloud,
  Shield,
  CheckCircle,
  AlertTriangle,
  MapPin,
} from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE =
  "Working in Special Locations - Bathrooms and Outdoors - Module 3.5.5 | Level 2 Electrical Course";
const DESCRIPTION =
  "Learn the essential requirements for working safely in bathrooms and outdoor environments. Master BS 7671 zoning systems, IP ratings, and protective measures for special locations.";

// End-of-section quiz (8 questions)
const quizQuestions = [
  {
    id: 1,
    question: "What IP rating is required for Zone 1 in a bathroom?",
    options: ["IPX2", "IPX4", "IPX5", "IP44"],
    correctAnswer: 1,
    explanation:
      "Zone 1 requires IPX4 minimum (IPX5 if subject to jet spray during cleaning). This protects against water splashing from any direction.",
  },
  {
    id: 2,
    question: "Which type of voltage supply is permitted in Zone 0?",
    options: ["230V AC", "110V AC", "SELV max 12V AC or 30V DC", "Any with RCD"],
    correctAnswer: 2,
    explanation:
      "Zone 0 (inside bath/shower) only permits SELV (Safety Extra-Low Voltage) with maximum 12V AC or 30V DC, sourced from outside the zones.",
  },
  {
    id: 3,
    question: "True or False: Standard sockets are allowed in Zone 2 of a bathroom.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. Standard 13A sockets are not permitted anywhere in bathroom zones. Only shaver supply units complying with BS EN 61558-2-5 are allowed in specific locations.",
  },
  {
    id: 4,
    question: "Name one protective measure for outdoor sockets.",
    options: [
      "IP66 weatherproof enclosure",
      "Paint the socket white",
      "Mount at head height only",
      "Use indoor-rated equipment",
    ],
    correctAnswer: 0,
    explanation:
      "IP66 enclosures provide protection against powerful water jets and dust ingress. Other measures include RCD protection and weatherproof covers.",
  },
  {
    id: 5,
    question: "What minimum IP rating is recommended for outdoor sockets?",
    options: ["IP44", "IP54", "IP65", "IP20"],
    correctAnswer: 2,
    explanation:
      "IP65 minimum is recommended for outdoor sockets to provide adequate protection against rain, dust, and environmental conditions.",
  },
  {
    id: 6,
    question: "Which section of BS 7671 covers bathrooms?",
    options: ["Section 409", "Section 701", "Section 711", "Section 709"],
    correctAnswer: 1,
    explanation:
      "BS 7671 Section 701 covers locations containing a bath or shower. Section 709 covers marinas and similar locations.",
  },
  {
    id: 7,
    question: "Give one example of mechanical protection for outdoor cables.",
    options: [
      "Paint the cables",
      "SWA (Steel Wire Armoured) cable",
      "Plastic cable ties",
      "Electrical tape wrapping",
    ],
    correctAnswer: 1,
    explanation:
      "SWA cable provides excellent mechanical protection with its steel wire armour. Other options include conduit, trunking, or protective covers.",
  },
  {
    id: 8,
    question: "Why is equipotential bonding important in bathrooms?",
    options: [
      "It makes water flow better",
      "It reduces voltage differences between conductive parts",
      "It prevents condensation",
      "It improves lighting quality",
    ],
    correctAnswer: 1,
    explanation:
      "Equipotential bonding connects all accessible conductive parts to the same potential, reducing dangerous voltage differences that could cause electric shock.",
  },
];

// Inline knowledge checks
const quickCheckQuestions = [
  {
    id: "bathroom-zones",
    question: "Which bathroom zone has the most stringent electrical requirements?",
    options: ["Zone 0", "Zone 1", "Zone 2", "Outside zones"],
    correctIndex: 0,
    explanation:
      "Zone 0 (inside bath/shower) has the strictest requirements - only SELV max 12V AC/30V DC with IPX7 rating is permitted.",
  },
  {
    id: "outdoor-rcd",
    question: "Is RCD protection mandatory for outdoor socket circuits?",
    options: ["No, it's optional", "Yes, 30mA maximum", "Only for commercial", "Only if metal enclosure"],
    correctIndex: 1,
    explanation:
      "Yes, BS 7671 requires RCD protection (≤30mA) for all outdoor socket outlets to provide additional protection against electric shock.",
  },
  {
    id: "ip-rating",
    question: "What does the 'X' in IPX4 mean?",
    options: ["Extra protection", "Not applicable", "No solid object protection specified", "Maximum rating"],
    correctIndex: 2,
    explanation:
      "The 'X' indicates that no level of solid object protection is specified in this rating - only the liquid protection (4) is defined.",
  },
];

export default function Module3Section5_5() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3.5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-card">
              <Zap className="w-6 h-6 text-foreground" />
            </div>
            <Badge
              variant="outline"
              className="border-emerald-500/30 text-emerald-400"
            >
              Section 3.5.5
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Working in Special Locations (Bathrooms, Outdoors – Basic Awareness)
          </h1>
          <p className="text-muted-foreground">
            Understanding the fundamental requirements for electrical work in bathrooms and outdoor environments, including BS 7671 zoning systems, protective measures, and equipment selection.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Special locations have higher electrical risks due to water and environment.</li>
                <li>BS 7671 Part 7 defines specific requirements for these areas.</li>
                <li>Bathroom zones determine what equipment can be installed where.</li>
                <li>Outdoor installations need enhanced protection against weather and damage.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Zones in bathrooms, outdoor exposures, water/weather risks.</li>
                <li><strong>Use:</strong> SELV in Zone 0, IP65+ outdoors, RCD protection, SWA cables.</li>
                <li><strong>Check:</strong> Zoning compliance, IP ratings, RCD operation, bonding integrity.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning Outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
            <li>Identify why bathrooms and outdoor areas are classed as special locations.</li>
            <li>Recognise the zoning system for bathrooms and its impact on equipment selection.</li>
            <li>Select suitable equipment for outdoor use based on IP ratings and mechanical protection.</li>
            <li>Understand basic protective measures required in these environments.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content / Learning</h2>

          {/* 1. Bathrooms and Shower Rooms */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Droplets className="w-5 h-5" /> 1. Bathrooms and Shower Rooms (BS 7671 Section 701)
            </h3>
            
            <div className="mb-6">
              <h4 className="font-medium text-foreground mb-3">Understanding the Risk Factor</h4>
              <div className="p-4 bg-card border border-border/30 rounded-lg mb-4">
                <p className="text-xs sm:text-sm text-foreground mb-3">
                  <strong>Why Bathrooms Are Special:</strong> Water dramatically reduces the body's electrical resistance from ~1000Ω (dry skin) to as low as 300-500Ω (wet skin), making normally safe voltages potentially lethal. The combination of bare skin, water, and metal fittings creates ideal conditions for electric shock.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Electrical Hazards</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Reduced body resistance:</strong> Wet skin conducts electricity readily</li>
                      <li>• <strong>Earth potential rise:</strong> Water creates conductive paths</li>
                      <li>• <strong>Steam/moisture:</strong> Can cause insulation breakdown</li>
                      <li>• <strong>Metal surfaces:</strong> Baths, pipes become potential conductors</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Physical Hazards</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Slippery surfaces:</strong> Risk of falls onto electrical equipment</li>
                      <li>• <strong>Limited escape routes:</strong> Confined spaces when showering</li>
                      <li>• <strong>Bare feet contact:</strong> Direct skin contact with floor</li>
                      <li>• <strong>Splashing water:</strong> Can reach electrical accessories</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-card border border-border/30 rounded-lg mb-4">
                <h5 className="font-medium text-emerald-400 mb-3">BS 7671 Bathroom Zoning System</h5>
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-border/20 text-sm">
                      <thead>
                        <tr className="bg-card">
                          <th className="border border-border/20 p-3 text-left">Zone</th>
                          <th className="border border-border/20 p-3 text-left">Location</th>
                          <th className="border border-border/20 p-3 text-left">Max Voltage</th>
                          <th className="border border-border/20 p-3 text-left">IP Rating</th>
                          <th className="border border-border/20 p-3 text-left">Equipment Permitted</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border/20 p-3"><strong>Zone 0</strong></td>
                          <td className="border border-border/20 p-3">Inside bath/shower tray</td>
                          <td className="border border-border/20 p-3">SELV 12V AC/30V DC</td>
                          <td className="border border-border/20 p-3">IPX7</td>
                          <td className="border border-border/20 p-3">Current-using equipment for that zone only</td>
                        </tr>
                        <tr className="bg-muted/5">
                          <td className="border border-border/20 p-3"><strong>Zone 1</strong></td>
                          <td className="border border-border/20 p-3">Above bath/shower to 2.25m</td>
                          <td className="border border-border/20 p-3">SELV or mains with RCD</td>
                          <td className="border border-border/20 p-3">IPX4 (IPX5 if jets)</td>
                          <td className="border border-border/20 p-3">Water heaters, shower pumps, ventilation</td>
                        </tr>
                        <tr>
                          <td className="border border-border/20 p-3"><strong>Zone 2</strong></td>
                          <td className="border border-border/20 p-3">0.6m outside Zone 1</td>
                          <td className="border border-border/20 p-3">Mains with RCD</td>
                          <td className="border border-border/20 p-3">IPX4</td>
                          <td className="border border-border/20 p-3">Luminaires, ventilation, water heating</td>
                        </tr>
                        <tr className="bg-muted/5">
                          <td className="border border-border/20 p-3"><strong>Outside Zones</strong></td>
                          <td className="border border-border/20 p-3">Beyond Zone 2 boundaries</td>
                          <td className="border border-border/20 p-3">Mains with RCD</td>
                          <td className="border border-border/20 p-3">Suitable for environment</td>
                          <td className="border border-border/20 p-3">Standard equipment (not 13A sockets)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-3 bg-white/5 rounded-lg">
                      <h6 className="font-medium text-foreground mb-2">Zone Measurement Rules</h6>
                      <ul className="space-y-1 text-sm">
                        <li>• Zones measured from bath rim or shower tray edge</li>
                        <li>• Zone 1 height: 2.25m above finished floor level</li>
                        <li>• Zone 2 width: 0.6m horizontal from Zone 1 boundary</li>
                        <li>• Doors and windows do not extend zones</li>
                        <li>• Fixed partitions may limit zone extent</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg">
                      <h6 className="font-medium text-foreground mb-2">Equipment Prohibited in All Zones</h6>
                      <ul className="space-y-1 text-sm">
                        <li>• Standard 13A socket outlets</li>
                        <li>• Distribution boards (except SELV)</li>
                        <li>• Switches (except pull cords in Zone 1)</li>
                        <li>• Standard junction boxes</li>
                        <li>• Non-bathroom rated accessories</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-card border border-green-400/30 rounded-lg">
                <h5 className="font-medium text-green-400 mb-3">Permitted Equipment and Installation Requirements</h5>
                <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Zone 0 Equipment</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• Fixed and permanently connected only</li>
                      <li>• SELV supplied from outside zones</li>
                      <li>• Suitable for continuous immersion</li>
                      <li>• Examples: Whirlpool pumps, underwater lighting</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Zone 1 Equipment</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• Instantaneous water heaters</li>
                      <li>• Shower pumps (if no alternative)</li>
                      <li>• Ventilation equipment</li>
                      <li>• Pull cord switches only</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Zone 2 Equipment</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• Luminaires with appropriate IP rating</li>
                      <li>• Shaver supply units to BS EN 61558-2-5</li>
                      <li>• Ventilation and water heating appliances</li>
                      <li>• Towel rails (Class II construction)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[0]} />
          <Separator className="my-6" />

          {/* 2. Outdoor Installations */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Cloud className="w-5 h-5" /> 2. Outdoor Installations (BS 7671 Section 714)
            </h3>

            <div className="mb-6">
              <h4 className="font-medium text-foreground mb-3">Environmental Risk Assessment</h4>
              <div className="p-4 bg-card border border-amber-400/30 rounded-lg mb-4">
                <h5 className="font-medium text-amber-400 mb-3">Weather and Environmental Hazards</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Water and Moisture</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Direct rainfall:</strong> Vertical and wind-driven water</li>
                      <li>• <strong>Ground moisture:</strong> Rising damp and surface water</li>
                      <li>• <strong>Condensation:</strong> Temperature cycling effects</li>
                      <li>• <strong>Snow/ice:</strong> Mechanical stress and water ingress</li>
                      <li>• <strong>Flooding:</strong> Temporary submersion risk</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Physical and Chemical</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>UV radiation:</strong> Polymer degradation and brittleness</li>
                      <li>• <strong>Temperature extremes:</strong> -20°C to +60°C in UK</li>
                      <li>• <strong>Wind loading:</strong> Mechanical stress on fixtures</li>
                      <li>• <strong>Dust and particles:</strong> Abrasive wear and fouling</li>
                      <li>• <strong>Pollution:</strong> Acid rain and airborne chemicals</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-card border border-border/30 rounded-lg mb-4">
                <h5 className="font-medium text-emerald-400 mb-3">IP Rating Selection for Outdoor Use</h5>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border/20 text-sm">
                    <thead>
                      <tr className="bg-card">
                        <th className="border border-border/20 p-3 text-left">Equipment Type</th>
                        <th className="border border-border/20 p-3 text-left">Minimum IP Rating</th>
                        <th className="border border-border/20 p-3 text-left">Recommended</th>
                        <th className="border border-border/20 p-3 text-left">Application Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border/20 p-3">Socket Outlets</td>
                        <td className="border border-border/20 p-3">IP44</td>
                        <td className="border border-border/20 p-3">IP66</td>
                        <td className="border border-border/20 p-3">Weatherproof cover essential</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-border/20 p-3">Light Fittings</td>
                        <td className="border border-border/20 p-3">IP44</td>
                        <td className="border border-border/20 p-3">IP65</td>
                        <td className="border border-border/20 p-3">Consider vandal resistance</td>
                      </tr>
                      <tr>
                        <td className="border border-border/20 p-3">Distribution Boards</td>
                        <td className="border border-border/20 p-3">IP54</td>
                        <td className="border border-border/20 p-3">IP66</td>
                        <td className="border border-border/20 p-3">Internal heater for condensation</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-border/20 p-3">Junction Boxes</td>
                        <td className="border border-border/20 p-3">IP65</td>
                        <td className="border border-border/20 p-3">IP67</td>
                        <td className="border border-border/20 p-3">Avoid if possible - use integral connections</td>
                      </tr>
                      <tr>
                        <td className="border border-border/20 p-3">Cable Glands</td>
                        <td className="border border-border/20 p-3">IP68</td>
                        <td className="border border-border/20 p-3">IP68</td>
                        <td className="border border-border/20 p-3">Match or exceed enclosure rating</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 bg-card border border-cyan-400/30 rounded-lg">
                <h5 className="font-medium text-cyan-400 mb-3">Cable Selection and Protection</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Underground Installation</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>SWA cable:</strong> Steel wire armour for mechanical protection</li>
                      <li>• <strong>Burial depth:</strong> Minimum 600mm (450mm with protection)</li>
                      <li>• <strong>Warning tape:</strong> 150mm above cable route</li>
                      <li>• <strong>Duct systems:</strong> Allow for cable replacement</li>
                      <li>• <strong>Drainage:</strong> Prevent water accumulation in ducts</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Overhead/Surface Installation</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Catenary wire:</strong> Support for span over 3m</li>
                      <li>• <strong>UV protection:</strong> Black sheath or protective covering</li>
                      <li>• <strong>Expansion joints:</strong> Long runs in conduit/trunking</li>
                      <li>• <strong>Mechanical protection:</strong> Impact-resistant covers</li>
                      <li>• <strong>Height clearance:</strong> 3.5m min over vehicle access</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[1]} />
          <Separator className="my-6" />

          {/* 3. Protective Measures */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5" /> 3. Essential Protective Measures
            </h3>

            <div className="space-y-4">
              <div className="p-4 bg-card border border-border/30 rounded-lg">
                <h5 className="font-medium text-emerald-400 mb-3">RCD Protection Requirements</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Mandatory Applications</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Bathrooms:</strong> All circuits except SELV (≤30mA)</li>
                      <li>• <strong>Outdoor sockets:</strong> All socket outlets (≤30mA)</li>
                      <li>• <strong>Mobile equipment:</strong> Portable outdoor use (≤30mA)</li>
                      <li>• <strong>TT systems:</strong> Additional protection for all circuits</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-foreground mb-2">RCD Types and Selection</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Type AC:</strong> Suitable for resistive and inductive loads</li>
                      <li>• <strong>Type A:</strong> Required for electronic equipment</li>
                      <li>• <strong>Time delay:</strong> S-type for discrimination</li>
                      <li>• <strong>Testing:</strong> Monthly operation for safety</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-card border border-border/30 rounded-lg">
                <h5 className="font-medium text-emerald-400 mb-3">Equipotential Bonding</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Bathroom Bonding Requirements</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Metallic services:</strong> Water, gas, waste pipes</li>
                      <li>• <strong>Structural metalwork:</strong> RSJs, reinforcement</li>
                      <li>• <strong>Accessible metalwork:</strong> Radiators, towel rails</li>
                      <li>• <strong>Cable size:</strong> Minimum 4mm² copper</li>
                      <li>• <strong>Connection method:</strong> Permanent, accessible joints</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Outdoor Bonding Considerations</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Metal structures:</strong> Gates, railings, lamp posts</li>
                      <li>• <strong>Underground services:</strong> Gas, water entry points</li>
                      <li>• <strong>Swimming pools:</strong> Comprehensive local bonding</li>
                      <li>• <strong>Marina installations:</strong> Specialised equipotential zone</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-card border border-green-400/30 rounded-lg">
                <h5 className="font-medium text-green-400 mb-3">Mechanical Protection Strategies</h5>
                <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Cable Protection</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• SWA cable for direct burial</li>
                      <li>• Impact-resistant conduit systems</li>
                      <li>• Cable covers over surface routes</li>
                      <li>• Flexible conduit at equipment connections</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Equipment Protection</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• Vandal-resistant enclosures (IK08+)</li>
                      <li>• Protective bollards around equipment</li>
                      <li>• Height mounting above damage risk</li>
                      <li>• Secure fixing to prevent theft</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Installation Methods</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• Avoid areas with vehicle/machinery access</li>
                      <li>• Use warning signs and barriers</li>
                      <li>• Plan routes away from construction zones</li>
                      <li>• Consider future access requirements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[2]} />
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="p-4 bg-card border border-border/20 rounded-lg">
              <h3 className="font-medium text-foreground mb-2">Q: Can I install a normal light switch in a bathroom?</h3>
              <p className="text-xs sm:text-sm text-foreground">
                A: Only if it's outside the zones. Inside zones, use pull cords or switches rated for the specific zone requirements with appropriate IP rating.
              </p>
            </div>
            <div className="p-4 bg-card border border-border/20 rounded-lg">
              <h3 className="font-medium text-foreground mb-2">Q: Are outdoor lights required to be IP-rated?</h3>
              <p className="text-xs sm:text-sm text-foreground">
                A: Yes, choose an IP rating suitable for exposure to rain and environmental conditions. Minimum IP44, but IP65 recommended for better protection.
              </p>
            </div>
            <div className="p-4 bg-card border border-border/20 rounded-lg">
              <h3 className="font-medium text-foreground mb-2">Q: Do outdoor sockets need to be switched?</h3>
              <p className="text-xs sm:text-sm text-foreground">
                A: Not mandatory by regulation, but switching adds convenience and provides additional isolation for maintenance safety.
              </p>
            </div>
            <div className="p-4 bg-card border border-border/20 rounded-lg">
              <h3 className="font-medium text-foreground mb-2">Q: Can I use a shaver socket in Zone 1?</h3>
              <p className="text-xs sm:text-sm text-foreground">
                A: Only if it complies with BS EN 61558-2-5 and is suitable for Zone 1 installation. Most shaver sockets are designed for Zone 2 or outside zones only.
              </p>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Summary</h2>
          <p className="text-foreground/90">
            Bathrooms and outdoor locations present elevated electrical risks requiring specific protective measures. Understanding BS 7671 zoning systems, selecting appropriate IP-rated equipment, implementing RCD protection, and ensuring proper equipotential bonding are fundamental to safe electrical work in these special locations. Always verify zone boundaries and equipment suitability before installation.
          </p>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Quiz (8 Questions)</h2>
          <Quiz questions={quizQuestions} />
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-border/20">
          <Button variant="outline" asChild>
            <Link to="../5-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Material Selection
            </Link>
          </Button>
          <Button asChild>
            <Link to="..">
              Next: Module 3 – Section 6
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}