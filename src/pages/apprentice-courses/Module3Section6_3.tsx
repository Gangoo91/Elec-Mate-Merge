import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Flame,
  Shield,
  AlertTriangle,
  CheckCircle,
  FileText,
  Wrench,
  Eye,
} from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE =
  "Fire Stopping and Sealing Penetrations - Module 3.6.3 | Level 2 Electrical Course";
const DESCRIPTION =
  "Learn essential fire stopping techniques and materials for electrical penetrations. Master Building Regulations Part B and BS 7671 requirements for maintaining fire compartment integrity.";

// End-of-section quiz (8 questions)
const quizQuestions = [
  {
    id: 1,
    question: "What is the main purpose of fire stopping?",
    options: [
      "Reduce noise transfer",
      "Prevent spread of fire and smoke",
      "Hold cables in place",
      "Reduce heat loss",
    ],
    correctAnswer: 1,
    explanation:
      "Fire stopping seals penetrations to prevent fire, smoke, and hot gases spreading between fire compartments, maintaining the integrity of fire barriers.",
  },
  {
    id: 2,
    question: "Which material expands when heated to seal gaps?",
    options: [
      "Standard silicone",
      "Intumescent sealant",
      "Plastic conduit",
      "Adhesive",
    ],
    correctAnswer: 1,
    explanation:
      "Intumescent materials expand when exposed to heat, creating a char that seals gaps and prevents fire spread through penetrations.",
  },
  {
    id: 3,
    question: "True or False: Any foam can be used for fire stopping.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. Only tested and certified fire-rated foams that meet specific fire resistance standards can be used for fire stopping applications.",
  },
  {
    id: 4,
    question: "Name one method for sealing large penetrations.",
    options: [
      "Fire-rated boards or intumescent wraps",
      "Standard plasterboard",
      "Plastic sheeting",
      "Cable ties",
    ],
    correctAnswer: 0,
    explanation:
      "Fire-rated boards, intumescent wraps, or fire pillows are approved methods for sealing larger penetrations while maintaining fire resistance.",
  },
  {
    id: 5,
    question: "What is the minimum fire rating typically required for escape route penetrations?",
    options: ["10 minutes", "30 minutes", "60 minutes", "90 minutes"],
    correctAnswer: 1,
    explanation:
      "30 minutes is typically the minimum fire rating for escape route penetrations, though higher ratings may be required in specific applications.",
  },
  {
    id: 6,
    question: "What must be done before installing fire stopping?",
    options: [
      "Paint the wall",
      "Identify and fully seal all gaps",
      "Disconnect all cables",
      "Install extra sockets",
    ],
    correctAnswer: 1,
    explanation:
      "All gaps and penetrations must be identified and properly sealed to maintain the fire-resisting properties of the barrier structure.",
  },
  {
    id: 7,
    question: "Give one reason why fire stopping is inspected after work is done.",
    options: [
      "To ensure aesthetic appearance",
      "To ensure integrity of fire barriers and compliance",
      "To check cable colours",
      "To verify socket positions",
    ],
    correctAnswer: 1,
    explanation:
      "Inspection ensures fire barrier integrity is maintained and installation complies with Building Regulations and BS 7671 requirements.",
  },
  {
    id: 8,
    question: "Which regulation in the UK covers fire stopping for service penetrations?",
    options: [
      "BS 5839 only",
      "Building Regulations Part B and BS 7671",
      "BS EN 60529 only",
      "Planning regulations",
    ],
    correctAnswer: 1,
    explanation:
      "Building Regulations Part B covers fire safety requirements while BS 7671 specifies electrical installation requirements for fire stopping.",
  },
];

// Inline knowledge checks
const quickCheckQuestions = [
  {
    id: "escape-routes",
    question: "Why is fire stopping important in escape routes?",
    options: [
      "It looks more professional",
      "It prevents fire/smoke spread that could block evacuation",
      "It reduces installation costs",
      "It improves cable performance",
    ],
    correctIndex: 1,
    explanation:
      "Fire stopping in escape routes prevents fire and smoke spread that could block evacuation paths, maintaining safe egress during emergencies.",
  },
  {
    id: "materials",
    question: "Give one example of a fire stopping material.",
    options: ["Standard expanding foam", "Intumescent sealant", "Plastic tape", "Cotton wadding"],
    correctIndex: 1,
    explanation:
      "Intumescent sealants expand when heated to seal gaps and are a primary fire stopping material for electrical penetrations.",
  },
  {
    id: "maintenance",
    question: "What should be done if a fire seal is damaged during maintenance?",
    options: [
      "Leave it until next inspection",
      "Replace immediately with approved materials",
      "Cover with plastic tape",
      "Report it next month",
    ],
    correctIndex: 1,
    explanation:
      "Damaged fire seals must be replaced immediately using approved fire-rated materials to maintain fire compartment integrity.",
  },
];

export default function Module3Section6_3() {
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
              Back to Section 3.6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-card">
              <Flame className="w-6 h-6 text-foreground" />
            </div>
            <Badge
              variant="outline"
              className="border-emerald-500/30 text-emerald-400"
            >
              Section 3.6.3
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Fire Stopping and Sealing Penetrations
          </h1>
          <p className="text-muted-foreground">
            Critical fire safety requirements for sealing electrical penetrations through fire barriers, maintaining compartmentation and escape route integrity per Building Regulations and BS 7671.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Service penetrations compromise fire barrier integrity without proper sealing.</li>
                <li>Fire stopping prevents flames, smoke, and heat spreading between compartments.</li>
                <li>Building Regulations Part B and BS 7671 mandate proper fire stopping.</li>
                <li>Only tested, certified fire-rated materials are acceptable for sealing.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Unsealed gaps, damaged seals, non-rated materials, missing fire stopping.</li>
                <li><strong>Use:</strong> Intumescent products, fire pillows, rated boards, certified systems.</li>
                <li><strong>Check:</strong> Seal integrity, material ratings, installation compliance, maintenance records.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning Outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
            <li>Explain why penetrations in fire barriers must be sealed and the consequences of failure.</li>
            <li>Identify approved materials and methods for different types of electrical penetrations.</li>
            <li>Apply correct installation techniques to maintain fire compartment integrity.</li>
            <li>Recognise inspection and maintenance requirements for fire stopping systems.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content / Learning</h2>

          {/* 1. Fire Compartmentation Principles and Requirements */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5" /> 1. Fire Compartmentation Principles and Requirements
            </h3>
            
            <div className="mb-6">
              <h4 className="font-medium text-foreground mb-3">Understanding Fire Compartmentation Strategy</h4>
              <div className="p-4 bg-card border border-border/30 rounded-lg mb-4">
                <p className="text-xs sm:text-sm text-foreground mb-3">
                  <strong>Compartmentation Philosophy:</strong> Fire compartmentation divides buildings into separate fire-resisting sections to prevent fire spread, protect escape routes, and provide firefighting access. Every penetration through these barriers potentially compromises the entire fire safety strategy unless properly sealed.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Fire Spread Mechanisms</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Flame spread:</strong> Direct fire penetration through openings</li>
                      <li>• <strong>Heat transfer:</strong> Conduction through materials and structures</li>
                      <li>• <strong>Smoke movement:</strong> Toxic gases spreading via air paths</li>
                      <li>• <strong>Stack effect:</strong> Vertical smoke movement in tall buildings</li>
                      <li>• <strong>Pressure differentials:</strong> Wind and HVAC effects on smoke flow</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Consequences of Unsealed Penetrations</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Rapid fire spread:</strong> 2-5 minute compartment failure</li>
                      <li>• <strong>Smoke logging:</strong> Escape route contamination</li>
                      <li>• <strong>Structural damage:</strong> Heat weakening adjacent compartments</li>
                      <li>• <strong>Life safety:</strong> Reduced evacuation time available</li>
                      <li>• <strong>Property loss:</strong> Exponential damage progression</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-card border border-border/30 rounded-lg mb-4">
                <h5 className="font-medium text-emerald-400 mb-3">Building Regulations and Legal Framework</h5>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border/20 text-sm">
                    <thead>
                      <tr className="bg-card">
                        <th className="border border-border/20 p-3 text-left">Regulation/Standard</th>
                        <th className="border border-border/20 p-3 text-left">Scope</th>
                        <th className="border border-border/20 p-3 text-left">Key Requirements</th>
                        <th className="border border-border/20 p-3 text-left">Compliance Evidence</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border/20 p-3"><strong>Building Regulations Part B</strong></td>
                        <td className="border border-border/20 p-3">Fire safety in buildings</td>
                        <td className="border border-border/20 p-3">Maintain fire resistance of barriers</td>
                        <td className="border border-border/20 p-3">Fire test certificates, installation records</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-border/20 p-3"><strong>BS 7671 Section 527</strong></td>
                        <td className="border border-border/20 p-3">Electrical installation fire precautions</td>
                        <td className="border border-border/20 p-3">Appropriate sealing where barriers penetrated</td>
                        <td className="border border-border/20 p-3">Material specifications, test certificates</td>
                      </tr>
                      <tr>
                        <td className="border border-border/20 p-3"><strong>BS EN 1366 Series</strong></td>
                        <td className="border border-border/20 p-3">Fire resistance testing</td>
                        <td className="border border-border/20 p-3">Test methods for service penetrations</td>
                        <td className="border border-border/20 p-3">Third-party test reports</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-border/20 p-3"><strong>BS 8519</strong></td>
                        <td className="border border-border/20 p-3">Fire stopping installation code</td>
                        <td className="border border-border/20 p-3">Installation best practice guidance</td>
                        <td className="border border-border/20 p-3">Installation certificates, photographic records</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 bg-card border border-green-400/30 rounded-lg">
                <h5 className="font-medium text-green-400 mb-3">Fire Resistance Rating Requirements</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Standard Fire Ratings</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>30 minutes:</strong> Typical for single-storey commercial, domestic</li>
                      <li>• <strong>60 minutes:</strong> Multi-storey offices, educational buildings</li>
                      <li>• <strong>90 minutes:</strong> High-rise buildings, hospitals</li>
                      <li>• <strong>120 minutes:</strong> Special risk buildings, critical infrastructure</li>
                      <li>• <strong>240 minutes:</strong> Exceptional cases, nuclear facilities</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Rating Criteria (EI Classification)</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>E - Integrity:</strong> No flames or hot gases pass through</li>
                      <li>• <strong>I - Insulation:</strong> Temperature rise limited (≤140°C average)</li>
                      <li>• <strong>Load bearing:</strong> R classification for structural elements</li>
                      <li>• <strong>Smoke control:</strong> S classification for smoke tightness</li>
                      <li>• <strong>Test conditions:</strong> ISO 834 standard fire curve</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[0]} />
          <Separator className="my-6" />

          {/* 2. Fire Stopping Materials and Systems */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Wrench className="w-5 h-5" /> 2. Fire Stopping Materials and Installation Systems
            </h3>

            <div className="mb-6">
              <h4 className="font-medium text-foreground mb-3">Intumescent Systems and Applications</h4>
              <div className="p-4 bg-card border border-border/30 rounded-lg mb-4">
                <h5 className="font-medium text-emerald-400 mb-3">Intumescent Material Technology</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Operating Principles</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Activation temperature:</strong> Typically 120-180°C</li>
                      <li>• <strong>Expansion ratio:</strong> 10:1 to 50:1 volume increase</li>
                      <li>• <strong>Char formation:</strong> Insulating carbonaceous layer</li>
                      <li>• <strong>Endothermic reaction:</strong> Absorbs heat during expansion</li>
                      <li>• <strong>Self-extinguishing:</strong> No contribution to fire load</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Product Forms and Applications</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Sealants:</strong> Gun-applied for small gaps and irregular shapes</li>
                      <li>• <strong>Putty:</strong> Hand-moldable for complex penetrations</li>
                      <li>• <strong>Strips and wraps:</strong> Pre-formed for pipe and cable bundles</li>
                      <li>• <strong>Blocks and pillows:</strong> Removable systems for access points</li>
                      <li>• <strong>Coatings:</strong> Spray or brush application for large areas</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 overflow-x-auto">
                  <table className="w-full border-collapse border border-border/20 text-sm">
                    <thead>
                      <tr className="bg-card">
                        <th className="border border-border/20 p-3 text-left">Material Type</th>
                        <th className="border border-border/20 p-3 text-left">Typical Applications</th>
                        <th className="border border-border/20 p-3 text-left">Gap Size Range</th>
                        <th className="border border-border/20 p-3 text-left">Fire Rating</th>
                        <th className="border border-border/20 p-3 text-left">Installation Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border/20 p-3">Intumescent Sealant</td>
                        <td className="border border-border/20 p-3">Small cable penetrations</td>
                        <td className="border border-border/20 p-3">5-25mm</td>
                        <td className="border border-border/20 p-3">30-240 minutes</td>
                        <td className="border border-border/20 p-3">Gun applied, tool finish required</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-border/20 p-3">Intumescent Putty</td>
                        <td className="border border-border/20 p-3">Complex shapes, grouped cables</td>
                        <td className="border border-border/20 p-3">10-100mm</td>
                        <td className="border border-border/20 p-3">60-120 minutes</td>
                        <td className="border border-border/20 p-3">Hand moldable, no curing time</td>
                      </tr>
                      <tr>
                        <td className="border border-border/20 p-3">Fire Collars</td>
                        <td className="border border-border/20 p-3">Plastic pipes and ducts</td>
                        <td className="border border-border/20 p-3">50-300mm diameter</td>
                        <td className="border border-border/20 p-3">30-120 minutes</td>
                        <td className="border border-border/20 p-3">Sized to pipe, structural fixing</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-border/20 p-3">Fire Pillows</td>
                        <td className="border border-border/20 p-3">Removable penetrations</td>
                        <td className="border border-border/20 p-3">100-500mm</td>
                        <td className="border border-border/20 p-3">60-180 minutes</td>
                        <td className="border border-border/20 p-3">Reusable, compression required</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 bg-card border border-amber-400/30 rounded-lg mb-4">
                <h5 className="font-medium text-amber-400 mb-3">Fire-Rated Board Systems and Structural Solutions</h5>
                <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Calcium Silicate Boards</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• Non-combustible mineral board</li>
                      <li>• 12-50mm thickness available</li>
                      <li>• 120-240 minute fire rating</li>
                      <li>• Structural strength maintained</li>
                      <li>• Moisture resistant variants</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Gypsum-Based Systems</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• Fire-rated plasterboard systems</li>
                      <li>• 15-25mm thickness typical</li>
                      <li>• 30-90 minute ratings</li>
                      <li>• Easy cutting and fixing</li>
                      <li>• Cost-effective for large openings</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Composite Fire Barriers</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• Multi-layer board systems</li>
                      <li>• Integrated intumescent strips</li>
                      <li>• Up to 240 minute rating</li>
                      <li>• Self-supporting installations</li>
                      <li>• Factory quality control</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-white/5 rounded-lg">
                  <h6 className="font-medium text-foreground mb-2">Installation Considerations for Board Systems</h6>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Structural support:</strong> Adequate framing for board weight and wind loading</li>
                      <li>• <strong>Joint sealing:</strong> All board joints must be sealed with compatible sealants</li>
                      <li>• <strong>Penetration sealing:</strong> Service entries through boards need additional sealing</li>
                      <li>• <strong>Fixing specifications:</strong> Use manufacturer-approved fixings at specified centres</li>
                    </ul>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Environmental conditions:</strong> Consider humidity and temperature effects</li>
                      <li>• <strong>Access requirements:</strong> Plan for future service modifications</li>
                      <li>• <strong>Quality control:</strong> Inspect all surfaces for damage before installation</li>
                      <li>• <strong>Documentation:</strong> Maintain records of board specifications and installation details</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-card border border-cyan-400/30 rounded-lg">
                <h5 className="font-medium text-cyan-400 mb-3">Electrical-Specific Fire Stopping Solutions</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Cable Tray Penetrations</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Tray fire barriers:</strong> Vertical and horizontal intumescent systems</li>
                      <li>• <strong>Wrap systems:</strong> Flexible intumescent wraps for cable bundles</li>
                      <li>• <strong>Box barriers:</strong> Enclosure systems for large cable quantities</li>
                      <li>• <strong>Coated barriers:</strong> Spray-applied intumescent coatings</li>
                      <li>• <strong>Hybrid systems:</strong> Combination of pillows and rigid barriers</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Conduit and Trunking Systems</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Metal conduit:</strong> Fire-rated joint compounds and end seals</li>
                      <li>• <strong>PVC systems:</strong> Intumescent collars to close gaps when plastic melts</li>
                      <li>• <strong>Cable baskets:</strong> Modular fire barrier systems</li>
                      <li>• <strong>Floor boxes:</strong> Specialist fire-rated floor penetration systems</li>
                      <li>• <strong>Busbar trunking:</strong> High-temperature rated fire stopping materials</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-white/5 rounded-lg">
                  <h6 className="font-medium text-foreground mb-2">Case Study: Data Centre Fire Stopping Strategy</h6>
                  <p className="text-xs sm:text-sm text-foreground mb-2">
                    <strong>Challenge:</strong> 500-rack data centre with multiple cable routes and high availability requirements.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Primary barrier:</strong> 240-minute rated compartment walls</li>
                      <li>• <strong>Cable routing:</strong> Dedicated fire-stopped risers every 20m</li>
                      <li>• <strong>Access strategy:</strong> Fire pillows for maintenance access points</li>
                      <li>• <strong>Redundancy:</strong> Multiple routes to prevent single point failure</li>
                    </ul>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Testing protocol:</strong> Annual inspection with thermal imaging</li>
                      <li>• <strong>Documentation:</strong> Digital twin model with fire stopping locations</li>
                      <li>• <strong>Maintenance:</strong> 24-hour response team for barrier integrity</li>
                      <li>• <strong>Performance:</strong> Zero fire spread incidents over 5-year operation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[1]} />
          <Separator className="my-6" />

          {/* 3. Installation Best Practice and Maintenance */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Eye className="w-5 h-5" /> 3. Installation Best Practice and Maintenance Requirements
            </h3>

            <div className="mb-6">
              <h4 className="font-medium text-foreground mb-3">Professional Installation Standards</h4>
              <div className="p-4 bg-card border border-green-400/30 rounded-lg mb-4">
                <h5 className="font-medium text-green-400 mb-3">Pre-Installation Assessment and Planning</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Site Assessment Requirements</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Barrier identification:</strong> Verify fire rating and construction type</li>
                      <li>• <strong>Penetration survey:</strong> Catalogue all existing and planned openings</li>
                      <li>• <strong>Service coordination:</strong> Plan routes to minimise penetrations</li>
                      <li>• <strong>Access planning:</strong> Identify maintenance and future modification needs</li>
                      <li>• <strong>Environmental conditions:</strong> Assess humidity, temperature, chemical exposure</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Material Selection Criteria</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Fire rating match:</strong> System rating ≥ barrier rating</li>
                      <li>• <strong>Test evidence:</strong> Third-party test reports for specific application</li>
                      <li>• <strong>Service compatibility:</strong> Chemical compatibility with cables/pipes</li>
                      <li>• <strong>Environmental durability:</strong> Long-term performance in service conditions</li>
                      <li>• <strong>Maintenance requirements:</strong> Inspection and replacement schedules</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-card border border-border/30 rounded-lg mb-4">
                <h5 className="font-medium text-emerald-400 mb-3">Installation Process and Quality Control</h5>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border/20 text-sm">
                    <thead>
                      <tr className="bg-card">
                        <th className="border border-border/20 p-3 text-left">Installation Stage</th>
                        <th className="border border-border/20 p-3 text-left">Key Activities</th>
                        <th className="border border-border/20 p-3 text-left">Quality Checks</th>
                        <th className="border border-border/20 p-3 text-left">Documentation</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border/20 p-3"><strong>Preparation</strong></td>
                        <td className="border border-border/20 p-3">Clean surfaces, remove debris, check dimensions</td>
                        <td className="border border-border/20 p-3">Surface condition, gap measurement</td>
                        <td className="border border-border/20 p-3">Site survey, material certificates</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-border/20 p-3"><strong>Installation</strong></td>
                        <td className="border border-border/20 p-3">Apply materials per manufacturer instructions</td>
                        <td className="border border-border/20 p-3">Coverage, thickness, adhesion</td>
                        <td className="border border-border/20 p-3">Installation photos, material usage</td>
                      </tr>
                      <tr>
                        <td className="border border-border/20 p-3"><strong>Curing/Setting</strong></td>
                        <td className="border border-border/20 p-3">Allow cure time, protect from damage</td>
                        <td className="border border-border/20 p-3">Cure completion, surface integrity</td>
                        <td className="border border-border/20 p-3">Time records, environmental conditions</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-border/20 p-3"><strong>Testing</strong></td>
                        <td className="border border-border/20 p-3">Visual inspection, smoke testing if required</td>
                        <td className="border border-border/20 p-3">Seal integrity, gap closure</td>
                        <td className="border border-border/20 p-3">Test certificates, non-conformance reports</td>
                      </tr>
                      <tr>
                        <td className="border border-border/20 p-3"><strong>Handover</strong></td>
                        <td className="border border-border/20 p-3">Provide documentation, maintenance schedule</td>
                        <td className="border border-border/20 p-3">Complete records, client sign-off</td>
                        <td className="border border-border/20 p-3">As-built drawings, O&M manuals</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 bg-card border border-border/30 rounded-lg mb-4">
                <h5 className="font-medium text-emerald-400 mb-3">Inspection and Maintenance Protocols</h5>
                <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Initial Inspection</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• Complete coverage verification</li>
                      <li>• Material adhesion testing</li>
                      <li>• Gap closure confirmation</li>
                      <li>• Visual defect assessment</li>
                      <li>• Photographic documentation</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Periodic Maintenance</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• 6-monthly visual inspections</li>
                      <li>• Annual detailed assessment</li>
                      <li>• Post-incident damage evaluation</li>
                      <li>• After any service modifications</li>
                      <li>• Environmental degradation monitoring</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Remedial Actions</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• Immediate repair of damage</li>
                      <li>• Material replacement when degraded</li>
                      <li>• System upgrade if standards change</li>
                      <li>• Documentation update requirements</li>
                      <li>• Competent person verification</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-white/5 rounded-lg">
                  <h6 className="font-medium text-foreground mb-2">Inspection Checklist for Fire Stopping Systems</h6>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Visual integrity:</strong> No cracks, gaps, or missing material</li>
                      <li>• <strong>Adhesion:</strong> Secure attachment to substrate surfaces</li>
                      <li>• <strong>Penetration changes:</strong> New or modified services since last inspection</li>
                      <li>• <strong>Environmental damage:</strong> Water damage, chemical attack, mechanical impact</li>
                    </ul>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Label condition:</strong> Fire stopping identification labels present and legible</li>
                      <li>• <strong>Access availability:</strong> Inspection and maintenance access maintained</li>
                      <li>• <strong>Documentation currency:</strong> Records match actual installation</li>
                      <li>• <strong>Competency verification:</strong> Qualified inspector certification current</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-card border border-border/30 rounded-lg">
                <h5 className="font-medium text-emerald-400 mb-3">Common Installation Failures and Prevention</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Typical Failure Modes</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Incomplete gap filling:</strong> Hidden voids behind visible sealing</li>
                      <li>• <strong>Material incompatibility:</strong> Chemical reaction between sealant and services</li>
                      <li>• <strong>Inadequate substrate preparation:</strong> Poor adhesion due to contamination</li>
                      <li>• <strong>Incorrect material selection:</strong> Wrong fire rating or application type</li>
                      <li>• <strong>Installation defects:</strong> Air bubbles, uneven application, insufficient thickness</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Prevention Strategies</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Competent installer training:</strong> Manufacturer certification programmes</li>
                      <li>• <strong>Quality control procedures:</strong> Stage inspections and hold points</li>
                      <li>• <strong>Material verification:</strong> Check certificates and batch numbers</li>
                      <li>• <strong>Installation supervision:</strong> Experienced oversight of critical installations</li>
                      <li>• <strong>Independent inspection:</strong> Third-party verification for critical applications</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-white/5 rounded-lg">
                  <h6 className="font-medium text-foreground mb-2">Emergency Response and Remedial Work</h6>
                  <p className="text-xs sm:text-sm text-foreground mb-2">
                    <strong>Scenario:</strong> Fire stopping damage discovered during routine inspection in a hospital critical care unit.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Immediate assessment:</strong> Risk evaluation and temporary measures</li>
                      <li>• <strong>Service continuity:</strong> Maintain power to critical systems during repair</li>
                      <li>• <strong>Emergency materials:</strong> Rapid-cure systems for urgent repairs</li>
                      <li>• <strong>Access coordination:</strong> Work around operational requirements</li>
                    </ul>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Quality assurance:</strong> Accelerated curing and testing procedures</li>
                      <li>• <strong>Documentation:</strong> Emergency work certificates and compliance records</li>
                      <li>• <strong>Follow-up inspection:</strong> Enhanced monitoring until full cure achieved</li>
                      <li>• <strong>Lessons learned:</strong> Update procedures to prevent recurrence</li>
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
              <h3 className="font-medium text-foreground mb-2">Q: Can expanding foam from a DIY store be used as fire stopping?</h3>
              <p className="text-xs sm:text-sm text-foreground">
                A: No. Only tested and certified fire-rated foams with proven fire resistance test evidence are acceptable for fire stopping applications.
              </p>
            </div>
            <div className="p-4 bg-card border border-border/20 rounded-lg">
              <h3 className="font-medium text-foreground mb-2">Q: Are fire pillows permanent installations?</h3>
              <p className="text-xs sm:text-sm text-foreground">
                A: No. Fire pillows are removable and intended for access points, but they must still provide the required fire rating and be properly compressed for effectiveness.
              </p>
            </div>
            <div className="p-4 bg-card border border-border/20 rounded-lg">
              <h3 className="font-medium text-foreground mb-2">Q: Does trunking itself provide fire stopping?</h3>
              <p className="text-xs sm:text-sm text-foreground">
                A: No. Unless it is specifically fire-rated trunking installed with approved sealing materials, additional fire stopping is required at barrier penetrations.
              </p>
            </div>
            <div className="p-4 bg-card border border-border/20 rounded-lg">
              <h3 className="font-medium text-foreground mb-2">Q: Who can install fire stopping systems?</h3>
              <p className="text-xs sm:text-sm text-foreground">
                A: Installation should be carried out by competent persons with appropriate training and certification. Many manufacturers offer training schemes for installers.
              </p>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Summary</h2>
          <p className="text-foreground/90">
            Fire stopping and sealing penetrations is a critical safety requirement that maintains building fire compartmentation and protects escape routes. Proper material selection, professional installation, and ongoing maintenance ensure compliance with Building Regulations Part B and BS 7671 while protecting life and property. Only tested, certified fire-rated systems should be used, and any breach of fire stopping integrity must be remedied immediately.
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
            <Link to="../6-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button asChild>
            <Link to="../6-4">
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}