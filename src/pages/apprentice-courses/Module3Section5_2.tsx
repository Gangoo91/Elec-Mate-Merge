import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Shield,
  Droplets,
  Wind,
  Zap,
  AlertTriangle,
  CheckCircle,
  FileText,
  Wrench,
  Factory,
  Home,
} from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE =
  "IP Ratings and Water/Dust Protection - Module 3.5.2 | Level 2 Electrical Course";
const DESCRIPTION =
  "Master IP rating codes, enclosure protection levels, and appropriate selection criteria for electrical equipment in various environmental conditions per BS EN 60529.";

// Quiz questions for the end of the page
const quizQuestions = [
  {
    id: 1,
    question: "In IP65, what does the number 6 indicate?",
    options: [
      "Protection against water jets",
      "Dust tight",
      "Splash protection",
      "Finger protection",
    ],
    correctAnswer: 1,
    explanation:
      "The first digit '6' indicates dust tight protection - complete exclusion of dust.",
  },
  {
    id: 2,
    question: "What is the minimum IP rating for Zone 1 in a bathroom?",
    options: ["IPX2", "IPX3", "IPX4", "IPX6"],
    correctAnswer: 2,
    explanation:
      "Zone 1 in bathrooms requires minimum IPX4 protection against splashing water from any direction.",
  },
  {
    id: 3,
    question: "True or False: IP44 is completely dust tight.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. IP44 provides protection against objects ≥1mm (first digit 4), but dust tight protection requires level 6.",
  },
  {
    id: 4,
    question: "Which IP rating is required for continuous immersion in water?",
    options: ["IP65", "IP67", "IP68", "IPX5"],
    correctAnswer: 2,
    explanation:
      "IP68 provides protection against continuous immersion in water under specified conditions.",
  },
  {
    id: 5,
    question: "Give one consequence of using an IP20 accessory outdoors.",
    options: [
      "Improved performance",
      "Water ingress causing short circuits",
      "Better ventilation",
      "Enhanced durability",
    ],
    correctAnswer: 1,
    explanation:
      "IP20 offers no water protection, leading to water ingress, short circuits, corrosion, and safety hazards outdoors.",
  },
  {
    id: 6,
    question: "What does the 'X' in IPX5 mean?",
    options: [
      "No protection",
      "Not tested for solids",
      "Protection against dust",
      "Protection against fire",
    ],
    correctAnswer: 1,
    explanation:
      "The 'X' indicates that the solid object protection level hasn't been tested or isn't specified for that enclosure.",
  },
  {
    id: 7,
    question: "Which IP rating is typically used for industrial washdown areas?",
    options: ["IP44", "IP55", "IP66", "IP20"],
    correctAnswer: 2,
    explanation:
      "IP66 provides dust tight protection and protection against powerful water jets, suitable for industrial washdown areas.",
  },
  {
    id: 8,
    question: "Name one factor to consider when choosing an IP rating.",
    options: [
      "Cable colour",
      "Environmental exposure conditions",
      "Circuit voltage",
      "Installation cost only",
    ],
    correctAnswer: 1,
    explanation:
      "Environmental conditions (water exposure, dust levels, temperature) are primary factors in IP rating selection.",
  },
];

// Quick knowledge check questions
const quickCheckQuestions = [
  {
    id: "first-digit",
    question: "What does the first digit of an IP rating indicate?",
    options: [
      "Water protection level",
      "Protection against solid objects and dust",
      "Temperature resistance",
      "Impact resistance",
    ],
    correctIndex: 1,
    explanation:
      "The first digit indicates the level of protection against solid objects and dust ingress (0-6 scale).",
  },
  {
    id: "dust-tight",
    question: "Which IP rating is considered completely dust tight?",
    options: ["IP54", "IP55", "IP64", "IP65"],
    correctIndex: 3,
    explanation:
      "IP65 (and IP66) are considered dust tight with the first digit '6' indicating complete dust exclusion.",
  },
  {
    id: "outdoor-rating",
    question: "What is the minimum recommended IP rating for an outdoor socket?",
    options: ["IP44", "IP54", "IP65", "IP68"],
    correctIndex: 2,
    explanation:
      "IP65 is the minimum recommended rating for outdoor sockets, providing dust tight and water jet protection.",
  },
];

export default function Module3Section5_2() {
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
              <Shield className="w-6 h-6 text-foreground" />
            </div>
            <Badge
              variant="outline"
              className="border-emerald-500/30 text-emerald-400"
            >
              Section 3.5.2
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            IP Ratings and Water/Dust Protection
          </h1>
          <p className="text-muted-foreground">
            Master IP rating classification systems, enclosure protection levels, and appropriate selection criteria for electrical equipment in various environmental conditions per BS EN 60529.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>IP ratings indicate protection levels against dust and water ingress.</li>
                <li>Two-digit system: first digit (solids), second digit (liquids).</li>
                <li>Standardised by BS EN 60529 for consistent equipment selection.</li>
                <li>Critical for safety, reliability, and BS 7671 compliance.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Equipment enclosures, IP markings, environmental conditions.</li>
                <li><strong>Use:</strong> Correct IP rating selection; environmental assessment.</li>
                <li><strong>Check:</strong> Dust levels, water exposure, installation location.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning Outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
            <li>Explain the meaning of an IP rating and its two-digit code system.</li>
            <li>Identify appropriate IP ratings for different environmental conditions.</li>
            <li>Apply IP rating knowledge to select suitable enclosures and accessories.</li>
            <li>Recognise the risks of using incorrect IP-rated equipment in harsh conditions.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content / Learning</h2>

          {/* 1. What is an IP Rating? */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5" /> 1. Understanding IP Ratings - Comprehensive Overview
            </h3>
            
            <div className="mb-6">
              <h4 className="font-medium text-foreground mb-3">IP Rating Fundamentals</h4>
              <div className="p-4 bg-card border border-border/30 rounded-lg mb-4">
                <p className="text-xs sm:text-sm text-foreground mb-3">
                  <strong>IP = Ingress Protection</strong> - A standardised rating system defined in BS EN 60529 that specifies the degree of protection provided by mechanical casings and electrical enclosures against intrusion of solid objects, dust, accidental contact, and water.
                </p>
                <div className="grid md:grid-cols-3 gap-3 sm:gap-4 mt-4">
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-emerald-400 mb-2">IP</div>
                    <p className="text-xs text-muted-foreground">Ingress Protection</p>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-emerald-400 mb-2">6</div>
                    <p className="text-xs text-muted-foreground">First Digit - Solids</p>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-emerald-400 mb-2">5</div>
                    <p className="text-xs text-muted-foreground">Second Digit - Liquids</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-card border border-amber-400/30 rounded-lg">
                  <h5 className="font-medium text-amber-400 mb-3">Standard Application Examples</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="font-medium text-foreground mb-2">Domestic Applications</h6>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong>IP20:</strong> Indoor switches and sockets (living rooms)</li>
                        <li>• <strong>IP44:</strong> Bathroom light switches outside zones</li>
                        <li>• <strong>IPX4:</strong> Bathroom zones 1 &amp; 2 minimum</li>
                        <li>• <strong>IP65:</strong> Outdoor garden sockets and lighting</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-medium text-foreground mb-2">Commercial/Industrial</h6>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong>IP54:</strong> Office and retail environments</li>
                        <li>• <strong>IP65:</strong> Food preparation areas</li>
                        <li>• <strong>IP66:</strong> Industrial washdown areas</li>
                        <li>• <strong>IP68:</strong> Submerged pumps and underwater lighting</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-card border border-green-400/30 rounded-lg">
                  <h5 className="font-medium text-green-400 mb-3">Testing Standards and Certification</h5>
                  <ul className="space-y-2 text-sm">
                    <li><strong>BS EN 60529:1992+A2:2013:</strong> Degrees of protection provided by enclosures (IP Code)</li>
                    <li><strong>Test conditions:</strong> Standardised procedures for dust and water ingress testing</li>
                    <li><strong>Certification requirements:</strong> Independent laboratory testing and verification</li>
                    <li><strong>Marking obligations:</strong> Clear IP rating display on equipment nameplates</li>
                    <li><strong>Periodic verification:</strong> Ongoing compliance monitoring and quality assurance</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[0]} />
          <Separator className="my-6" />

          {/* 2. First Digit - Solid Object Protection */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Wind className="w-5 h-5" /> 2. First Digit - Solid Object and Dust Protection
            </h3>
            
            <div className="mb-6">
              <h4 className="font-medium text-foreground mb-3">Protection Levels Against Solid Objects</h4>
              <div className="space-y-3">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border/20 text-sm">
                    <thead>
                      <tr className="bg-card">
                        <th className="border border-border/20 p-3 text-left">Digit</th>
                        <th className="border border-border/20 p-3 text-left">Protection Level</th>
                        <th className="border border-border/20 p-3 text-left">Object Size</th>
                        <th className="border border-border/20 p-3 text-left">Typical Applications</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border/20 p-3 font-medium">0</td>
                        <td className="border border-border/20 p-3">No protection</td>
                        <td className="border border-border/20 p-3">No barrier</td>
                        <td className="border border-border/20 p-3">Internal components, controlled environments</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-border/20 p-3 font-medium">1</td>
                        <td className="border border-border/20 p-3">Large solid objects</td>
                        <td className="border border-border/20 p-3">≥ 50mm</td>
                        <td className="border border-border/20 p-3">Accidental large object contact, overhead equipment</td>
                      </tr>
                      <tr>
                        <td className="border border-border/20 p-3 font-medium">2</td>
                        <td className="border border-border/20 p-3">Medium solid objects</td>
                        <td className="border border-border/20 p-3">≥ 12.5mm</td>
                        <td className="border border-border/20 p-3">Finger protection, basic enclosures</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-border/20 p-3 font-medium">3</td>
                        <td className="border border-border/20 p-3">Small solid objects</td>
                        <td className="border border-border/20 p-3">≥ 2.5mm</td>
                        <td className="border border-border/20 p-3">Tools, thick wires, enhanced safety</td>
                      </tr>
                      <tr>
                        <td className="border border-border/20 p-3 font-medium">4</td>
                        <td className="border border-border/20 p-3">Very small objects</td>
                        <td className="border border-border/20 p-3">≥ 1mm</td>
                        <td className="border border-border/20 p-3">Small tools, thin wires, precision protection</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-border/20 p-3 font-medium">5</td>
                        <td className="border border-border/20 p-3">Dust protected</td>
                        <td className="border border-border/20 p-3">Limited ingress</td>
                        <td className="border border-border/20 p-3">Dusty environments, no harmful deposits</td>
                      </tr>
                      <tr>
                        <td className="border border-border/20 p-3 font-medium">6</td>
                        <td className="border border-border/20 p-3">Dust tight</td>
                        <td className="border border-border/20 p-3">Complete exclusion</td>
                        <td className="border border-border/20 p-3">Critical equipment, harsh environments</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-card border border-border/30 rounded-lg">
                    <h5 className="font-medium text-emerald-400 mb-2">Dust Protection Considerations</h5>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span><strong>Level 5 vs 6:</strong> Level 5 allows limited dust ingress that doesn't affect operation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span><strong>Test duration:</strong> 8-hour test with talcum powder circulation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span><strong>Air pressure:</strong> Negative pressure applied during testing</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 bg-card border border-border/30 rounded-lg">
                    <h5 className="font-medium text-emerald-400 mb-2">Industry-Specific Requirements</h5>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Factory className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span><strong>Food processing:</strong> IP65/66 minimum for hygiene compliance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Wrench className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span><strong>Manufacturing:</strong> IP54 typical, IP65 for dusty operations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Home className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span><strong>Domestic:</strong> IP20 standard, IP44+ for wet areas</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[1]} />
          <Separator className="my-6" />

          {/* 3. Second Digit - Water Protection */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Droplets className="w-5 h-5" /> 3. Second Digit - Water and Moisture Protection
            </h3>
            
            <div className="mb-6">
              <h4 className="font-medium text-foreground mb-3">Protection Levels Against Water Ingress</h4>
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border/20 text-sm">
                    <thead>
                      <tr className="bg-card">
                        <th className="border border-border/20 p-3 text-left">Digit</th>
                        <th className="border border-border/20 p-3 text-left">Protection Level</th>
                        <th className="border border-border/20 p-3 text-left">Test Method</th>
                        <th className="border border-border/20 p-3 text-left">Example Applications</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border/20 p-3 font-medium">0</td>
                        <td className="border border-border/20 p-3">No protection</td>
                        <td className="border border-border/20 p-3">No test</td>
                        <td className="border border-border/20 p-3">Indoor dry locations only</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-border/20 p-3 font-medium">1</td>
                        <td className="border border-border/20 p-3">Vertically dripping water</td>
                        <td className="border border-border/20 p-3">1mm/min for 10 min</td>
                        <td className="border border-border/20 p-3">Minimal exposure, covered areas</td>
                      </tr>
                      <tr>
                        <td className="border border-border/20 p-3 font-medium">2</td>
                        <td className="border border-border/20 p-3">Dripping water (15° tilt)</td>
                        <td className="border border-border/20 p-3">3mm/min at 15° angles</td>
                        <td className="border border-border/20 p-3">Slightly angled surfaces</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-border/20 p-3 font-medium">3</td>
                        <td className="border border-border/20 p-3">Spraying water (60°)</td>
                        <td className="border border-border/20 p-3">Spray nozzle, 60° arc</td>
                        <td className="border border-border/20 p-3">Light rain, indoor splashes</td>
                      </tr>
                      <tr>
                        <td className="border border-border/20 p-3 font-medium">4</td>
                        <td className="border border-border/20 p-3">Splashing water</td>
                        <td className="border border-border/20 p-3">All directions, 10L/min</td>
                        <td className="border border-border/20 p-3">Kitchen sinks, workshops</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-border/20 p-3 font-medium">5</td>
                        <td className="border border-border/20 p-3">Water jets</td>
                        <td className="border border-border/20 p-3">6.3mm nozzle, 12.5L/min</td>
                        <td className="border border-border/20 p-3">Outdoor hoses, washdown</td>
                      </tr>
                      <tr>
                        <td className="border border-border/20 p-3 font-medium">6</td>
                        <td className="border border-border/20 p-3">Powerful water jets</td>
                        <td className="border border-border/20 p-3">12.5mm nozzle, 100L/min</td>
                        <td className="border border-border/20 p-3">Marine, heavy washdown</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-border/20 p-3 font-medium">7</td>
                        <td className="border border-border/20 p-3">Immersion up to 1m</td>
                        <td className="border border-border/20 p-3">30 min at 1m depth</td>
                        <td className="border border-border/20 p-3">Short-term flooding</td>
                      </tr>
                      <tr>
                        <td className="border border-border/20 p-3 font-medium">8</td>
                        <td className="border border-border/20 p-3">Continuous immersion</td>
                        <td className="border border-border/20 p-3">Manufacturer specified</td>
                        <td className="border border-border/20 p-3">Submerged equipment</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="space-y-3">
                  <div className="p-4 bg-card border border-border/30 rounded-lg">
                    <h5 className="font-medium text-emerald-400 mb-3">Critical Water Protection Considerations</h5>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h6 className="font-medium text-foreground mb-2">Testing Limitations</h6>
                        <ul className="space-y-1 text-sm">
                          <li>• <strong>IPX7 vs IPX8:</strong> Equipment rated IPX7 may not pass IPX6 tests</li>
                          <li>• <strong>Progressive testing:</strong> Not always cumulative - check specific ratings</li>
                          <li>• <strong>Temperature effects:</strong> Tests conducted at room temperature</li>
                          <li>• <strong>Pressure variations:</strong> Actual conditions may exceed test parameters</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-medium text-foreground mb-2">Real-world Factors</h6>
                        <ul className="space-y-1 text-sm">
                          <li>• <strong>Aging effects:</strong> Seals degrade over time</li>
                          <li>• <strong>Mechanical stress:</strong> Vibration affects seal integrity</li>
                          <li>• <strong>Chemical exposure:</strong> Cleaning agents can damage seals</li>
                          <li>• <strong>UV degradation:</strong> Outdoor exposure affects materials</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-card border border-green-400/30 rounded-lg">
                    <h5 className="font-medium text-green-400 mb-3">Water Protection Best Practices</h5>
                    <ul className="space-y-2 text-sm">
                      <li><strong>Seal maintenance:</strong> Regular inspection and replacement of gaskets and seals</li>
                      <li><strong>Drainage provision:</strong> Install equipment with adequate drainage where possible</li>
                      <li><strong>Cable entry protection:</strong> Use appropriate cable glands with correct IP rating</li>
                      <li><strong>Orientation considerations:</strong> Mount equipment to minimise water pooling</li>
                      <li><strong>Preventive maintenance:</strong> Schedule regular waterproofing system checks</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[2]} />
          <Separator className="my-6" />

          {/* 4. Selection Criteria and Application */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5" /> 4. IP Rating Selection Criteria and Environmental Assessment
            </h3>

            <div className="space-y-6">
              <div className="p-4 bg-card border border-amber-400/30 rounded-lg">
                <h5 className="font-medium text-amber-400 mb-3">Environmental Assessment Matrix</h5>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border/20 text-sm">
                    <thead>
                      <tr className="bg-card">
                        <th className="border border-border/20 p-3 text-left">Location Type</th>
                        <th className="border border-border/20 p-3 text-left">Dust Exposure</th>
                        <th className="border border-border/20 p-3 text-left">Water Exposure</th>
                        <th className="border border-border/20 p-3 text-left">Recommended IP</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border/20 p-3">Domestic indoor</td>
                        <td className="border border-border/20 p-3">Minimal</td>
                        <td className="border border-border/20 p-3">None</td>
                        <td className="border border-border/20 p-3">IP20-IP40</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-border/20 p-3">Bathroom Zone 1</td>
                        <td className="border border-border/20 p-3">Low</td>
                        <td className="border border-border/20 p-3">Splashing</td>
                        <td className="border border-border/20 p-3">IPX4 minimum</td>
                      </tr>
                      <tr>
                        <td className="border border-border/20 p-3">Kitchen commercial</td>
                        <td className="border border-border/20 p-3">Moderate</td>
                        <td className="border border-border/20 p-3">Spraying/jets</td>
                        <td className="border border-border/20 p-3">IP65</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-border/20 p-3">Outdoor general</td>
                        <td className="border border-border/20 p-3">Variable</td>
                        <td className="border border-border/20 p-3">Rain/washing</td>
                        <td className="border border-border/20 p-3">IP65</td>
                      </tr>
                      <tr>
                        <td className="border border-border/20 p-3">Industrial dusty</td>
                        <td className="border border-border/20 p-3">High</td>
                        <td className="border border-border/20 p-3">Minimal</td>
                        <td className="border border-border/20 p-3">IP54/IP64</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-border/20 p-3">Washdown areas</td>
                        <td className="border border-border/20 p-3">Variable</td>
                        <td className="border border-border/20 p-3">High pressure</td>
                        <td className="border border-border/20 p-3">IP66/IP67</td>
                      </tr>
                      <tr>
                        <td className="border border-border/20 p-3">Marine/coastal</td>
                        <td className="border border-border/20 p-3">Salt laden</td>
                        <td className="border border-border/20 p-3">Spray/waves</td>
                        <td className="border border-border/20 p-3">IP66/IP67</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-border/20 p-3">Submerged</td>
                        <td className="border border-border/20 p-3">Underwater</td>
                        <td className="border border-border/20 p-3">Immersion</td>
                        <td className="border border-border/20 p-3">IP68</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-card border border-border/30 rounded-lg">
                  <h5 className="font-medium text-emerald-400 mb-3">Cost-Benefit Analysis</h5>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Over-specification costs:</strong> Higher IP ratings increase equipment cost</li>
                    <li><strong>Under-specification risks:</strong> Premature failure, safety hazards, insurance issues</li>
                    <li><strong>Lifecycle considerations:</strong> Maintenance, replacement, and downtime costs</li>
                    <li><strong>Environmental changes:</strong> Future-proofing against changing conditions</li>
                    <li><strong>Insurance requirements:</strong> Policy compliance and risk assessment</li>
                  </ul>
                </div>
                <div className="p-4 bg-card border border-border/30 rounded-lg">
                  <h5 className="font-medium text-emerald-400 mb-3">Special Considerations</h5>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Temperature cycling:</strong> Thermal expansion affects seals</li>
                    <li><strong>Pressure differentials:</strong> Altitude and weather effects</li>
                    <li><strong>Chemical compatibility:</strong> Cleaning agents and process chemicals</li>
                    <li><strong>Mechanical stress:</strong> Vibration, impact, and movement</li>
                    <li><strong>Maintenance access:</strong> Regular inspection and seal replacement</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-card border border-green-400/30 rounded-lg">
                <h5 className="font-medium text-green-400 mb-3">Documentation and Verification Requirements</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Installation Documentation</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• Environmental assessment records</li>
                      <li>• IP rating selection justification</li>
                      <li>• Equipment certification documents</li>
                      <li>• Installation method statements</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Ongoing Verification</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• Periodic seal integrity testing</li>
                      <li>• Environmental condition monitoring</li>
                      <li>• Performance degradation assessment</li>
                      <li>• Maintenance schedule compliance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        {/* Real-World Examples */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Real-World Case Studies</h2>
          <div className="space-y-4">
            <div className="p-4 bg-card border border-amber-400/30 rounded-lg">
              <h3 className="font-medium text-amber-400 mb-3">Case Study 1: Food Processing Plant Washdown Failure</h3>
              <p className="text-xs sm:text-sm text-foreground mb-3">
                <strong>Situation:</strong> Light fittings with IP44 rating were installed in a food processing washdown area requiring daily high-pressure cleaning.
              </p>
              <p className="text-xs sm:text-sm text-foreground mb-3">
                <strong>Problem:</strong> Within months, water ingress corroded internal components, causing failures and potential food contamination risks.
              </p>
              <p className="text-xs sm:text-sm text-foreground">
                <strong>Solution:</strong> Replacement with IP66-rated stainless steel fittings eliminated ingress issues, ensured hygiene compliance, and provided long-term reliability meeting food safety standards.
              </p>
            </div>

            <div className="p-4 bg-card border border-border/30 rounded-lg">
              <h3 className="font-medium text-emerald-400 mb-3">Case Study 2: Coastal Installation Corrosion</h3>
              <p className="text-xs sm:text-sm text-foreground mb-3">
                <strong>Situation:</strong> Standard IP65 outdoor equipment was installed at a coastal facility without considering salt spray exposure.
              </p>
              <p className="text-xs sm:text-sm text-foreground mb-3">
                <strong>Analysis:</strong> Salt-laden moisture penetrated standard seals, causing rapid corrosion of internal components despite adequate IP rating.
              </p>
              <p className="text-xs sm:text-sm text-foreground">
                <strong>Solution:</strong> Upgrade to marine-grade IP66 equipment with EPDM seals and sacrificial anodes provided effective long-term protection.
              </p>
            </div>

            <div className="p-4 bg-card border border-green-400/30 rounded-lg">
              <h3 className="font-medium text-green-400 mb-3">Case Study 3: Underground Installation Success</h3>
              <p className="text-xs sm:text-sm text-foreground mb-3">
                <strong>Challenge:</strong> Electrical equipment needed for basement installation with risk of flooding and high humidity.
              </p>
              <p className="text-xs sm:text-sm text-foreground mb-3">
                <strong>Approach:</strong> Selected IP68-rated equipment with certified continuous immersion capability and implemented drainage systems.
              </p>
              <p className="text-xs sm:text-sm text-foreground">
                <strong>Outcome:</strong> System operated reliably through multiple flood events, demonstrating the importance of proper IP rating selection and environmental planning.
              </p>
            </div>
          </div>
        </Card>

        {/* Enhanced FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="p-4 bg-card border border-border/20 rounded-lg">
              <h3 className="font-medium text-foreground mb-2">Q: Does a higher IP rating mean better in all cases?</h3>
              <p className="text-xs sm:text-sm text-foreground">
                A: Not necessarily. Higher ratings increase cost and may reduce heat dissipation. The key is matching the rating to actual environmental conditions. Over-specification can be wasteful and may create operational issues.
              </p>
            </div>
            <div className="p-4 bg-card border border-border/20 rounded-lg">
              <h3 className="font-medium text-foreground mb-2">Q: What does 'X' mean in an IP code like IPX4?</h3>
              <p className="text-xs sm:text-sm text-foreground">
                A: The 'X' indicates that the protection level for that digit (solid or liquid) hasn't been tested or isn't specified. IPX4 means water protection level 4 but solid object protection is not defined.
              </p>
            </div>
            <div className="p-4 bg-card border border-border/20 rounded-lg">
              <h3 className="font-medium text-foreground mb-2">Q: Can IP68 equipment be used above ground?</h3>
              <p className="text-xs sm:text-sm text-foreground">
                A: Yes, IP68 simply indicates the highest level of water protection (continuous immersion). It can be used in any application where this level of protection is beneficial, not just underwater.
              </p>
            </div>
            <div className="p-4 bg-card border border-border/20 rounded-lg">
              <h3 className="font-medium text-foreground mb-2">Q: How often should IP-rated equipment be inspected?</h3>
              <p className="text-xs sm:text-sm text-foreground">
                A: Inspection frequency depends on environmental severity. Harsh environments may require monthly checks, while benign conditions might need only annual inspection. Always follow manufacturer recommendations.
              </p>
            </div>
            <div className="p-4 bg-card border border-border/20 rounded-lg">
              <h3 className="font-medium text-foreground mb-2">Q: Can IP ratings be maintained after cable entry modifications?</h3>
              <p className="text-xs sm:text-sm text-foreground">
                A: Only if appropriate cable glands and sealing methods are used that maintain the original IP rating. Any modification should be verified against the original test standards.
              </p>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Summary</h2>
          <p className="text-foreground/90">
            IP ratings provide a standardised method for defining protection levels against solid objects and liquids in electrical enclosures. Proper selection based on environmental assessment ensures equipment operates safely and reliably, avoiding costly failures and maintaining compliance with safety standards. Understanding the two-digit system and testing standards enables informed decisions for any installation environment.
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
            <Link to="../5-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Understanding External Influences
            </Link>
          </Button>
          <Button asChild>
            <Link to="../5-3">
              Next: Subsection 5.3
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}