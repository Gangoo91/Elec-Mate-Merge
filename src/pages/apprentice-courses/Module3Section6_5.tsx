import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Tag,
  Shield,
  FileText,
  Eye,
  Palette,
} from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE =
  "Labelling, Identification, and Colour Codes - Module 3.6.5 | Level 2 Electrical Course";
const DESCRIPTION =
  "Master electrical labelling, identification systems and cable colour codes per BS 7671. Ensure safety, compliance and efficient maintenance through proper marking systems.";

// Quiz (8 questions)
const quizQuestions = [
  {
    id: 1,
    question: "What is the UK colour for single-phase neutral conductors?",
    options: ["Black", "Blue", "Grey", "Yellow"],
    correctAnswer: 1,
    explanation:
      "Blue is the standard colour for neutral conductors in UK single-phase systems since harmonisation in 2004.",
  },
  {
    id: 2,
    question: "Which phase colour is used for L2 in a modern three-phase system?",
    options: ["Brown", "Black", "Grey", "Blue"],
    correctAnswer: 1,
    explanation:
      "In post-2004 UK three-phase systems: L1=Brown, L2=Black, L3=Grey, with Blue for neutral and Green/Yellow for earth.",
  },
  {
    id: 3,
    question: "True or False: A consumer unit must have a circuit schedule.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "BS 7671 requires consumer units to have circuit schedules showing circuit purpose and protective device ratings.",
  },
  {
    id: 4,
    question: "Name one warning notice required under BS 7671.",
    options: [
      "Dual supply warning",
      "High voltage present",
      "No smoking sign",
      "Emergency contact details",
    ],
    correctAnswer: 0,
    explanation:
      "BS 7671 requires warning notices for dual supplies, RCD coverage, isolation points, and other safety-critical situations.",
  },
  {
    id: 5,
    question: "What is the earth conductor colour code in the UK?",
    options: ["Blue", "Brown", "Green/Yellow", "Grey"],
    correctAnswer: 2,
    explanation:
      "Green/Yellow striping is the universal colour code for earth (CPC) conductors in the UK and internationally.",
  },
  {
    id: 6,
    question: "Which labelling method is most suitable for marine environments?",
    options: [
      "Self-adhesive vinyl",
      "Heat-shrink marker",
      "Laser-etched stainless steel",
      "Paper tag",
    ],
    correctAnswer: 2,
    explanation:
      "Laser-etched stainless steel provides maximum durability against salt spray, UV, and harsh marine conditions.",
  },
  {
    id: 7,
    question: "Why is it important to mark spare conductors?",
    options: [
      "For aesthetic reasons",
      "To prevent accidental connection and confusion",
      "To meet colour coding standards",
      "To reduce installation costs",
    ],
    correctAnswer: 1,
    explanation:
      "Marking spare conductors prevents dangerous accidental connections and helps future engineers understand the system layout.",
  },
  {
    id: 8,
    question: "What must be displayed where both pre- and post-2004 wiring colours exist?",
    options: [
      "Circuit schedule only",
      "Warning notice indicating mixed wiring colours",
      "New cable colour chart",
      "Electrical certificate",
    ],
    correctAnswer: 1,
    explanation:
      "Warning notices must identify where both old and new colour codes exist to prevent dangerous confusion during maintenance.",
  },
];

// Inline knowledge checks
const quickCheckQuestions = [
  {
    id: "live-colour",
    question: "What is the UK cable colour for a single-phase live conductor?",
    options: ["Red", "Brown", "Black", "Blue"],
    correctIndex: 1,
    explanation:
      "Brown is the standard colour for single-phase live (line) conductors in post-2004 UK installations.",
  },
  {
    id: "durable-labels",
    question: "Name one type of durable label suitable for industrial environments.",
    options: [
      "Paper stickers",
      "Engraved Traffolyte labels",
      "Masking tape",
      "Marker pen on cable",
    ],
    correctIndex: 1,
    explanation:
      "Engraved Traffolyte labels provide excellent durability and legibility for industrial applications.",
  },
  {
    id: "label-durability",
    question: "Why must labels be legible for the life of the installation?",
    options: [
      "For aesthetic purposes only",
      "To ensure ongoing safety and efficient maintenance",
      "To meet insurance requirements",
      "To reduce material costs",
    ],
    correctIndex: 1,
    explanation:
      "Label legibility throughout the installation's life ensures continued safety and enables efficient maintenance and fault-finding.",
  },
];

export default function Module3Section6_5() {
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
              <Tag className="w-6 h-6 text-foreground" />
            </div>
            <Badge
              variant="outline"
              className="border-emerald-500/30 text-emerald-400"
            >
              Section 3.6.5
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Labelling, Identification, and Colour Codes
          </h1>
          <p className="text-muted-foreground">
            Ensure safe and efficient electrical systems through proper labelling, identification systems and standardised colour coding per BS 7671 requirements.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Clear labelling prevents dangerous accidental energisation during maintenance.</li>
                <li>BS 7671 mandates circuit schedules, warning notices and conductor identification.</li>
                <li>Post-2004 colour codes are standardised: Brown (L), Blue (N), Green/Yellow (E).</li>
                <li>Durable labelling methods ensure long-term safety and compliance.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Missing labels, illegible markings, mixed colour codes, unlabelled spares.</li>
                <li><strong>Use:</strong> Circuit schedules, warning notices, conductor identification, durable markers.</li>
                <li><strong>Check:</strong> Label legibility, colour code compliance, documentation updates, spare marking.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning Outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
            <li>Explain the safety and compliance requirements for electrical labelling and identification.</li>
            <li>Apply BS 7671 requirements for labels, notices and circuit documentation.</li>
            <li>Implement correct cable colour codes for single-phase and three-phase systems.</li>
            <li>Select appropriate labelling methods for different environmental conditions.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content / Learning</h2>

          {/* 1. Purpose and Safety Functions of Labelling */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5" /> 1. Purpose and Safety Functions of Labelling
            </h3>

            <div className="mb-6">
              <h4 className="font-medium text-foreground mb-3">Critical Safety Functions</h4>
              <div className="p-4 bg-card border border-border/30 rounded-lg mb-4">
                <h5 className="font-medium text-emerald-400 mb-3">Risk Mitigation Through Identification</h5>
                <p className="text-xs sm:text-sm text-foreground mb-3">
                  <strong>Safety Foundation:</strong> Proper labelling forms the foundation of electrical safety during operation, maintenance and emergency response. Clear identification prevents the primary cause of electrical accidents: working on the wrong circuit or assuming a circuit is dead when live.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Primary Safety Functions</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Circuit identification:</strong> Prevents accidental energisation during maintenance</li>
                      <li>• <strong>System boundaries:</strong> Clear demarcation of different voltage levels</li>
                      <li>• <strong>Isolation points:</strong> Quick identification for emergency shutdown</li>
                      <li>• <strong>Warning notices:</strong> Alert to special hazards or operating conditions</li>
                      <li>• <strong>Emergency response:</strong> Rapid system understanding for first responders</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Operational Benefits</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Faster fault-finding:</strong> Reduced downtime through quick circuit identification</li>
                      <li>• <strong>Maintenance efficiency:</strong> Clear system documentation supports planning</li>
                      <li>• <strong>Regulatory compliance:</strong> Meets BS 7671 and health & safety requirements</li>
                      <li>• <strong>Asset management:</strong> Supports accurate system records and auditing</li>
                      <li>• <strong>Training tool:</strong> Helps apprentices understand system layout</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-card border border-amber-400/30 rounded-lg mb-4">
                <h5 className="font-medium text-amber-400 mb-3">Accident Prevention Statistics</h5>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border/20 text-sm">
                    <thead>
                      <tr className="bg-card">
                        <th className="border border-border/20 p-3 text-left">Incident Type</th>
                        <th className="border border-border/20 p-3 text-left">% of Electrical Accidents</th>
                        <th className="border border-border/20 p-3 text-left">Primary Cause</th>
                        <th className="border border-border/20 p-3 text-left">Prevention Method</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border/20 p-3">Wrong circuit isolated</td>
                        <td className="border border-border/20 p-3">35%</td>
                        <td className="border border-border/20 p-3">Poor/missing circuit labels</td>
                        <td className="border border-border/20 p-3">Clear circuit schedules and labelling</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-border/20 p-3">Mixed voltage confusion</td>
                        <td className="border border-border/20 p-3">20%</td>
                        <td className="border border-border/20 p-3">Inadequate voltage identification</td>
                        <td className="border border-border/20 p-3">Voltage warning notices and colour coding</td>
                      </tr>
                      <tr>
                        <td className="border border-border/20 p-3">Phase/neutral confusion</td>
                        <td className="border border-border/20 p-3">25%</td>
                        <td className="border border-border/20 p-3">Non-standard colour codes</td>
                        <td className="border border-border/20 p-3">Standardised conductor identification</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-border/20 p-3">Emergency shutdown delays</td>
                        <td className="border border-border/20 p-3">15%</td>
                        <td className="border border-border/20 p-3">Unknown isolation points</td>
                        <td className="border border-border/20 p-3">Clear isolation point marking</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 bg-card border border-cyan-400/30 rounded-lg">
                <h5 className="font-medium text-cyan-400 mb-3">Business Case for Proper Labelling</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Cost Savings</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Reduced fault-finding time:</strong> 60-80% time saving vs unlabelled systems</li>
                      <li>• <strong>Lower insurance premiums:</strong> Demonstrable risk reduction</li>
                      <li>• <strong>Avoided downtime costs:</strong> Faster emergency response and repairs</li>
                      <li>• <strong>Reduced training costs:</strong> Clear systems easier to understand</li>
                      <li>• <strong>Compliance efficiency:</strong> Faster regulatory inspections</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Risk Mitigation</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Accident prevention:</strong> Significantly reduced electrical injury risk</li>
                      <li>• <strong>Property protection:</strong> Faster isolation minimises fire/damage risk</li>
                      <li>• <strong>Legal compliance:</strong> Meets statutory health & safety obligations</li>
                      <li>• <strong>Professional standards:</strong> Demonstrates competent installation practice</li>
                      <li>• <strong>Reputation protection:</strong> Avoids incidents affecting business standing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[0]} />
          <Separator className="my-6" />

          {/* 2. BS 7671 Labelling Requirements */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5" /> 2. BS 7671 Labelling and Documentation Requirements
            </h3>

            <div className="mb-6">
              <h4 className="font-medium text-foreground mb-3">Mandatory Labelling and Notice Requirements</h4>
              <div className="p-4 bg-card border border-border/30 rounded-lg mb-4">
                <h5 className="font-medium text-emerald-400 mb-3">Circuit Information and Schedules</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Consumer Unit Requirements (Section 514)</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Circuit schedule:</strong> All circuits must be clearly identified</li>
                      <li>• <strong>Circuit designation:</strong> Purpose/area served by each circuit</li>
                      <li>• <strong>Protective device rating:</strong> MCB/RCD ratings clearly marked</li>
                      <li>• <strong>Cable size indication:</strong> Conductor cross-sectional area</li>
                      <li>• <strong>Maximum demand:</strong> Design current for each circuit</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Distribution Board Marking</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Nominal voltage:</strong> System voltage clearly displayed</li>
                      <li>• <strong>System type:</strong> TN-S, TN-C-S, TT system identification</li>
                      <li>• <strong>Main switch rating:</strong> Isolation capacity marked</li>
                      <li>• <strong>Installation date:</strong> When system was installed/modified</li>
                      <li>• <strong>Next inspection due:</strong> Periodic inspection requirements</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-card border border-green-400/30 rounded-lg mb-4">
                <h5 className="font-medium text-green-400 mb-3">Mandatory Warning Notices</h5>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border/20 text-sm">
                    <thead>
                      <tr className="bg-card">
                        <th className="border border-border/20 p-3 text-left">Warning Notice Type</th>
                        <th className="border border-border/20 p-3 text-left">BS 7671 Requirement</th>
                        <th className="border border-border/20 p-3 text-left">Required Text/Content</th>
                        <th className="border border-border/20 p-3 text-left">Location</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border/20 p-3"><strong>Dual Supply</strong></td>
                        <td className="border border-border/20 p-3">Regulation 514.15.1</td>
                        <td className="border border-border/20 p-3">"Warning: Dual Supply" + isolation requirements</td>
                        <td className="border border-border/20 p-3">All switch positions for both supplies</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-border/20 p-3"><strong>RCD Protection</strong></td>
                        <td className="border border-border/20 p-3">Regulation 514.12.2</td>
                        <td className="border border-border/20 p-3">"This installation has RCD protection"</td>
                        <td className="border border-border/20 p-3">Consumer unit if not all circuits RCD protected</td>
                      </tr>
                      <tr>
                        <td className="border border-border/20 p-3"><strong>Isolation Points</strong></td>
                        <td className="border border-border/20 p-3">Regulation 514.11.1</td>
                        <td className="border border-border/20 p-3">Clear marking of isolation function</td>
                        <td className="border border-border/20 p-3">All main isolation and switching points</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-border/20 p-3"><strong>Mixed Wiring Colours</strong></td>
                        <td className="border border-border/20 p-3">Regulation 514.14.1</td>
                        <td className="border border-border/20 p-3">"Caution: This installation has wiring colours to two standards"</td>
                        <td className="border border-border/20 p-3">Consumer unit/distribution board</td>
                      </tr>
                      <tr>
                        <td className="border border-border/20 p-3"><strong>Photovoltaic Installation</strong></td>
                        <td className="border border-border/20 p-3">Section 712</td>
                        <td className="border border-border/20 p-3">PV system warnings and isolation procedures</td>
                        <td className="border border-border/20 p-3">DC and AC isolation points</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-border/20 p-3"><strong>Periodic Inspection</strong></td>
                        <td className="border border-border/20 p-3">Regulation 514.12.1</td>
                        <td className="border border-border/20 p-3">Next inspection due date</td>
                        <td className="border border-border/20 p-3">Consumer unit/main distribution board</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 bg-card border border-border/30 rounded-lg">
                <h5 className="font-medium text-emerald-400 mb-3">Label Durability and Legibility Requirements</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Material Standards</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Durability:</strong> Legible for the design life of the installation</li>
                      <li>• <strong>Environmental resistance:</strong> Suitable for the installation environment</li>
                      <li>• <strong>Adhesion:</strong> Secure fixing that won't deteriorate</li>
                      <li>• <strong>Contrast:</strong> Clear text/background contrast for legibility</li>
                      <li>• <strong>Size:</strong> Text large enough to read at normal working distance</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Information Content</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Unambiguous:</strong> Clear, specific identification</li>
                      <li>• <strong>Consistent:</strong> Same terminology throughout installation</li>
                      <li>• <strong>Complete:</strong> All necessary safety and operational information</li>
                      <li>• <strong>Current:</strong> Updated to reflect system modifications</li>
                      <li>• <strong>Accessible:</strong> Visible and readable during normal operations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[1]} />
          <Separator className="my-6" />

          {/* 3. Cable Colour Codes and Conductor Identification */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Palette className="w-5 h-5" /> 3. Cable Colour Codes and Conductor Identification
            </h3>

            <div className="mb-6">
              <h4 className="font-medium text-foreground mb-3">Harmonised Colour Code Standards</h4>
              <div className="p-4 bg-card border border-green-400/30 rounded-lg mb-4">
                <h5 className="font-medium text-green-400 mb-3">Post-2004 UK/EU Harmonised Colours</h5>
                <p className="text-xs sm:text-sm text-foreground mb-3">
                  <strong>Harmonisation Background:</strong> The UK adopted EU harmonised cable colours in 2004 to ensure consistency across Europe. This change affects all new installations and modifications, requiring careful management where old and new colours coexist.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Single-Phase AC Systems</h6>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 p-2 border border-border/20 rounded">
                        <div className="w-6 h-6 bg-amber-600 rounded border border-gray-400"></div>
                        <span className="text-sm"><strong>Live (Line):</strong> Brown</span>
                      </div>
                      <div className="flex items-center gap-3 p-2 border border-border/20 rounded">
                        <div className="w-6 h-6 bg-emerald-500 rounded border border-gray-400"></div>
                        <span className="text-sm"><strong>Neutral:</strong> Blue</span>
                      </div>
                      <div className="flex items-center gap-3 p-2 border border-border/20 rounded">
                        <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-yellow-400 rounded border border-gray-400"></div>
                        <span className="text-sm"><strong>Earth (CPC):</strong> Green/Yellow</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Three-Phase AC Systems</h6>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 p-2 border border-border/20 rounded">
                        <div className="w-6 h-6 bg-amber-600 rounded border border-gray-400"></div>
                        <span className="text-sm"><strong>L1:</strong> Brown</span>
                      </div>
                      <div className="flex items-center gap-3 p-2 border border-border/20 rounded">
                        <div className="w-6 h-6 bg-black rounded border border-gray-400"></div>
                        <span className="text-sm"><strong>L2:</strong> Black</span>
                      </div>
                      <div className="flex items-center gap-3 p-2 border border-border/20 rounded">
                        <div className="w-6 h-6 bg-gray-500 rounded border border-gray-400"></div>
                        <span className="text-sm"><strong>L3:</strong> Grey</span>
                      </div>
                      <div className="flex items-center gap-3 p-2 border border-border/20 rounded">
                        <div className="w-6 h-6 bg-emerald-500 rounded border border-gray-400"></div>
                        <span className="text-sm"><strong>Neutral:</strong> Blue</span>
                      </div>
                      <div className="flex items-center gap-3 p-2 border border-border/20 rounded">
                        <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-yellow-400 rounded border border-gray-400"></div>
                        <span className="text-sm"><strong>Earth (CPC):</strong> Green/Yellow</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-card border border-amber-400/30 rounded-lg mb-4">
                <h5 className="font-medium text-amber-400 mb-3">Pre-2004 Colour Codes (Legacy Systems)</h5>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border/20 text-sm">
                    <thead>
                      <tr className="bg-card">
                        <th className="border border-border/20 p-3 text-left">Function</th>
                        <th className="border border-border/20 p-3 text-left">Pre-2004 Colour</th>
                        <th className="border border-border/20 p-3 text-left">Post-2004 Colour</th>
                        <th className="border border-border/20 p-3 text-left">Risk Factor</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border/20 p-3">Single-phase Live</td>
                        <td className="border border-border/20 p-3">Red</td>
                        <td className="border border-border/20 p-3">Brown</td>
                        <td className="border border-border/20 p-3 text-green-600">Low confusion risk</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-border/20 p-3">Single-phase Neutral</td>
                        <td className="border border-border/20 p-3">Black</td>
                        <td className="border border-border/20 p-3">Blue</td>
                        <td className="border border-border/20 p-3 text-red-600">HIGH: Black now L2 in 3-phase</td>
                      </tr>
                      <tr>
                        <td className="border border-border/20 p-3">Three-phase L1</td>
                        <td className="border border-border/20 p-3">Red</td>
                        <td className="border border-border/20 p-3">Brown</td>
                        <td className="border border-border/20 p-3 text-green-600">Low confusion risk</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-border/20 p-3">Three-phase L2</td>
                        <td className="border border-border/20 p-3">Yellow</td>
                        <td className="border border-border/20 p-3">Black</td>
                        <td className="border border-border/20 p-3 text-amber-600">Medium confusion risk</td>
                      </tr>
                      <tr>
                        <td className="border border-border/20 p-3">Three-phase L3</td>
                        <td className="border border-border/20 p-3">Blue</td>
                        <td className="border border-border/20 p-3">Grey</td>
                        <td className="border border-border/20 p-3 text-red-600">HIGH: Blue now neutral</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-border/20 p-3">Neutral</td>
                        <td className="border border-border/20 p-3">Black</td>
                        <td className="border border-border/20 p-3">Blue</td>
                        <td className="border border-border/20 p-3 text-red-600">CRITICAL: Major safety risk</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 bg-card border border-border/30 rounded-lg">
                <h5 className="font-medium text-emerald-400 mb-3">Mixed Colour Code Safety Procedures</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Identification Requirements</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Warning notices:</strong> Mandatory at main distribution points</li>
                      <li>• <strong>Colour identification:</strong> Mark old/new systems clearly</li>
                      <li>• <strong>Testing protocols:</strong> Always test before touch approach</li>
                      <li>• <strong>Documentation:</strong> Record which areas use which colours</li>
                      <li>• <strong>Training updates:</strong> Ensure all staff aware of mixed systems</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Safe Working Practices</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Visual verification:</strong> Never rely on colour alone</li>
                      <li>• <strong>Voltage testing:</strong> Confirm conductor function before work</li>
                      <li>• <strong>Phase rotation:</strong> Check sequence on three-phase systems</li>
                      <li>• <strong>Isolation verification:</strong> Test isolation regardless of colour</li>
                      <li>• <strong>Temporary marking:</strong> Add labels during complex work</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[2]} />
          <Separator className="my-6" />

          {/* 4. Labelling Methods and Environmental Selection */}
          <section className="mb-2">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Eye className="w-5 h-5" /> 4. Labelling Methods and Environmental Selection
            </h3>

            <div className="mb-6">
              <h4 className="font-medium text-foreground mb-3">Material Selection for Different Environments</h4>
              <div className="p-4 bg-card border border-border/30 rounded-lg mb-4">
                <h5 className="font-medium text-emerald-400 mb-3">Labelling Technology Options</h5>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border/20 text-sm">
                    <thead>
                      <tr className="bg-card">
                        <th className="border border-border/20 p-3 text-left">Method</th>
                        <th className="border border-border/20 p-3 text-left">Material</th>
                        <th className="border border-border/20 p-3 text-left">Environment Suitability</th>
                        <th className="border border-border/20 p-3 text-left">Lifespan</th>
                        <th className="border border-border/20 p-3 text-left">Cost Range</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border/20 p-3"><strong>Engraved Traffolyte</strong></td>
                        <td className="border border-border/20 p-3">Phenolic laminate</td>
                        <td className="border border-border/20 p-3">Indoor/outdoor, high durability</td>
                        <td className="border border-border/20 p-3">25+ years</td>
                        <td className="border border-border/20 p-3">£2-10 per label</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-border/20 p-3"><strong>Heat-shrink markers</strong></td>
                        <td className="border border-border/20 p-3">Polyolefin/PVC</td>
                        <td className="border border-border/20 p-3">Cable marking, abrasion resistant</td>
                        <td className="border border-border/20 p-3">15-20 years</td>
                        <td className="border border-border/20 p-3">£0.10-2 per marker</td>
                      </tr>
                      <tr>
                        <td className="border border-border/20 p-3"><strong>Self-adhesive vinyl</strong></td>
                        <td className="border border-border/20 p-3">PVC/polyester</td>
                        <td className="border border-border/20 p-3">Indoor only, unless UV-resistant</td>
                        <td className="border border-border/20 p-3">5-10 years</td>
                        <td className="border border-border/20 p-3">£0.05-1 per label</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-border/20 p-3"><strong>Laser-etched stainless</strong></td>
                        <td className="border border-border/20 p-3">316 stainless steel</td>
                        <td className="border border-border/20 p-3">Marine, chemical, extreme conditions</td>
                        <td className="border border-border/20 p-3">50+ years</td>
                        <td className="border border-border/20 p-3">£5-25 per label</td>
                      </tr>
                      <tr>
                        <td className="border border-border/20 p-3"><strong>Aluminium anodised</strong></td>
                        <td className="border border-border/20 p-3">Anodised aluminium</td>
                        <td className="border border-border/20 p-3">Industrial, outdoor applications</td>
                        <td className="border border-border/20 p-3">20-30 years</td>
                        <td className="border border-border/20 p-3">£1-8 per label</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-border/20 p-3"><strong>Cable tie labels</strong></td>
                        <td className="border border-border/20 p-3">Nylon with flag tag</td>
                        <td className="border border-border/20 p-3">Cable bundling, temporary marking</td>
                        <td className="border border-border/20 p-3">10-15 years</td>
                        <td className="border border-border/20 p-3">£0.20-2 per tie</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 bg-card border border-border/30 rounded-lg">
                <h5 className="font-medium text-emerald-400 mb-3">Environmental Selection Criteria</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Indoor Applications</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Office/commercial:</strong> Self-adhesive vinyl or traffolyte</li>
                      <li>• <strong>Industrial dry:</strong> Engraved traffolyte or anodised aluminium</li>
                      <li>• <strong>Data centres:</strong> Anti-static materials, flame retardant</li>
                      <li>• <strong>Healthcare:</strong> Easy-clean, non-shedding materials</li>
                      <li>• <strong>Food processing:</strong> Smooth, washable, FDA-approved materials</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Harsh Environment Applications</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Marine/offshore:</strong> Stainless steel, salt spray resistance</li>
                      <li>• <strong>Chemical plants:</strong> Chemical-resistant materials, ATEX compliance</li>
                      <li>• <strong>Outdoor/UV exposure:</strong> UV-stable materials, colour fastness</li>
                      <li>• <strong>High temperature:</strong> Heat-resistant polymers or ceramics</li>
                      <li>• <strong>Cryogenic:</strong> Low-temperature stable materials</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Real-World Example */}
          <div className="mt-6 p-4 bg-card border border-border/30 rounded-lg">
            <h5 className="font-medium text-emerald-400 mb-2">Real-World Example</h5>
            <p className="text-xs sm:text-sm text-foreground">
              An industrial plant suffered repeated downtime due to unlabelled distribution boards. Engineers spent hours tracing circuits during fault-finding. After implementing engraved Traffolyte labels and updated circuit schedules, fault-finding time was reduced by 70%, and a serious accident was prevented when a contractor nearly worked on the wrong 415V circuit.
            </p>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="p-4 bg-card border border-border/20 rounded-lg">
              <h3 className="font-medium text-foreground mb-2">Q: Do I have to relabel old wiring to new colours?</h3>
              <p className="text-xs sm:text-sm text-foreground">
                A: No, existing installations don't require relabelling. However, warning notices must be displayed where old and new colour codes coexist in the same installation.
              </p>
            </div>
            <div className="p-4 bg-card border border-border/20 rounded-lg">
              <h3 className="font-medium text-foreground mb-2">Q: Can I handwrite circuit IDs on masking tape?</h3>
              <p className="text-xs sm:text-sm text-foreground">
                A: Only as a temporary measure during installation or testing. BS 7671 requires permanent, durable labelling suitable for the installation environment.
              </p>
            </div>
            <div className="p-4 bg-card border border-border/20 rounded-lg">
              <h3 className="font-medium text-foreground mb-2">Q: Are cable markers mandatory for every cable?</h3>
              <p className="text-xs sm:text-sm text-foreground">
                A: Not every cable in domestic installations, but all conductors should be identifiable at terminations. Complex or commercial systems require comprehensive identification.
              </p>
            </div>
            <div className="p-4 bg-card border border-border/20 rounded-lg">
              <h3 className="font-medium text-foreground mb-2">Q: What size should text be on electrical labels?</h3>
              <p className="text-xs sm:text-sm text-foreground">
                A: Text should be legible at normal working distance (typically 0.5-1m). Minimum 3mm character height for normal applications, larger for safety-critical labels.
              </p>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Summary</h2>
          <p className="text-foreground/90">
            Proper labelling, identification and colour coding are fundamental to electrical safety and regulatory compliance. BS 7671 requirements for circuit schedules, warning notices and conductor identification must be implemented with durable materials suitable for the environment. Standardised colour codes prevent dangerous wiring errors, while clear labelling systems ensure safe operation and maintenance throughout the installation's life.
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
            <Link to="../6-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button asChild>
            <Link to="../6-6">
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}