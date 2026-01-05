import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Sun,
  Thermometer,
  Hammer,
  AlertTriangle,
  CheckCircle,
  FileText,
  Shield,
  Wrench,
  Zap,
  Factory,
} from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE =
  "UV, Temperature, and Mechanical Damage Risks - Module 3.5.3 | Level 2 Electrical Course";
const DESCRIPTION =
  "Understand environmental stresses affecting electrical installations including UV degradation, temperature extremes, and mechanical damage, with protective measures per BS 7671.";

// Quiz questions for the end of the page
const quizQuestions = [
  {
    id: 1,
    question: "What does UV exposure do to cable sheathing over time?",
    options: [
      "Makes it more flexible",
      "Makes it brittle and cracked",
      "Increases insulation thickness",
      "Improves conductivity",
    ],
    correctAnswer: 1,
    explanation:
      "UV radiation breaks down polymer chains in plastics, making cable sheathing brittle and prone to cracking.",
  },
  {
    id: 2,
    question: "What's one method to protect cables from UV damage?",
    options: [
      "Paint them",
      "Use UV-resistant cable or conduit",
      "Wrap them in insulation tape",
      "Install them indoors only",
    ],
    correctAnswer: 1,
    explanation:
      "UV-resistant cables or protective conduit/trunking provide effective protection against solar radiation damage.",
  },
  {
    id: 3,
    question: "True or False: Low temperatures can make cable sheathing brittle.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. Low temperatures reduce material flexibility and can cause cracking, especially during installation or movement.",
  },
  {
    id: 4,
    question: "What factor in BS 7671 adjusts cable current ratings for heat?",
    options: [
      "Loop impedance",
      "Derating factor",
      "Voltage drop",
      "Discrimination factor",
    ],
    correctAnswer: 1,
    explanation:
      "Derating factors (Ca, Cg, Ci) reduce cable current-carrying capacity based on ambient temperature, grouping, and thermal insulation.",
  },
  {
    id: 5,
    question: "Name one protective measure against mechanical damage.",
    options: [
      "Use thinner cables",
      "Install cables in steel conduit or use SWA",
      "Paint cable routes",
      "Use lower voltages",
    ],
    correctAnswer: 1,
    explanation:
      "Steel conduit, trunking, or Steel Wire Armoured (SWA) cables provide excellent mechanical protection.",
  },
  {
    id: 6,
    question: "Which type of cable is best for high impact risk environments?",
    options: [
      "Twin & Earth",
      "SY cable",
      "Steel Wire Armoured (SWA)",
      "Data cable",
    ],
    correctAnswer: 2,
    explanation:
      "Steel Wire Armoured (SWA) cables have steel wire armour providing excellent protection against mechanical damage.",
  },
  {
    id: 7,
    question: "Give one effect of high temperature on electrical cables.",
    options: [
      "Improves insulation properties",
      "Accelerates insulation breakdown",
      "Increases current capacity",
      "Reduces resistance",
    ],
    correctAnswer: 1,
    explanation:
      "High temperatures accelerate chemical breakdown of insulation materials and reduce current-carrying capacity.",
  },
  {
    id: 8,
    question: "Name a protective fitting used to prevent abrasion at cable entry points.",
    options: [
      "Cable tie",
      "Grommet or bushing",
      "Terminal block",
      "Cable marker",
    ],
    correctAnswer: 1,
    explanation:
      "Grommets and bushings protect cables from sharp edges and abrasion at entry points to enclosures.",
  },
];

// Quick knowledge check questions
const quickCheckQuestions = [
  {
    id: "uv-damage",
    question: "How does UV radiation damage electrical cable insulation?",
    options: [
      "It makes cables conduct electricity better",
      "It breaks down polymer chains causing brittleness",
      "It increases cable flexibility",
      "It improves weather resistance",
    ],
    correctIndex: 1,
    explanation:
      "UV radiation breaks down polymer chains in plastic materials, causing them to become brittle, crack, and lose their protective properties.",
  },
  {
    id: "temperature-protection",
    question: "Give one way to protect cables from high temperature environments.",
    options: [
      "Use smaller cable sizes",
      "Apply derating factors and ensure ventilation",
      "Increase voltage levels",
      "Use standard PVC cables",
    ],
    correctIndex: 1,
    explanation:
      "Proper derating calculations, adequate ventilation, and selection of cables with appropriate temperature ratings protect against heat damage.",
  },
  {
    id: "mechanical-protection",
    question: "Name one type of cable suitable for areas with high risk of mechanical damage.",
    options: [
      "Standard twin and earth",
      "Steel Wire Armoured (SWA) cable",
      "Flexible cord",
      "Ribbon cable",
    ],
    correctIndex: 1,
    explanation:
      "Steel Wire Armoured (SWA) cables have steel wire protection making them ideal for high mechanical damage risk areas.",
  },
];

export default function Module3Section5_3() {
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
              <Sun className="w-6 h-6 text-foreground" />
            </div>
            <Badge
              variant="outline"
              className="border-emerald-500/30 text-emerald-400"
            >
              Section 3.5.3
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            UV, Temperature, and Mechanical Damage Risks
          </h1>
          <p className="text-muted-foreground">
            Understand environmental stresses affecting electrical installations including UV degradation, temperature extremes, and mechanical damage, with comprehensive protective measures per BS 7671.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Electrical installations face UV, temperature, and mechanical stresses.</li>
                <li>These factors cause material degradation and safety risks.</li>
                <li>Proper material selection and protection prevents premature failure.</li>
                <li>BS 7671 requires assessment during design and installation phases.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> UV exposure signs, temperature extremes, impact risks.</li>
                <li><strong>Use:</strong> UV-resistant materials; temperature derating; mechanical protection.</li>
                <li><strong>Check:</strong> Cable condition, protection integrity, environmental changes.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning Outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
            <li>Explain how UV radiation, temperature, and mechanical forces can damage electrical installations.</li>
            <li>Identify materials and equipment suitable for these environmental stresses.</li>
            <li>Apply protective measures to mitigate each type of risk.</li>
            <li>Recognise common signs of damage and know when maintenance is needed.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content / Learning</h2>

          {/* 1. UV Degradation */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Sun className="w-5 h-5" /> 1. UV Degradation - Understanding Solar Radiation Damage
            </h3>
            
            <div className="mb-6">
              <h4 className="font-medium text-foreground mb-3">UV Radiation Physics and Material Impact</h4>
              <div className="p-4 bg-card border border-amber-400/30 rounded-lg mb-4">
                <p className="text-xs sm:text-sm text-foreground mb-3">
                  <strong>UV Radiation Spectrum:</strong> Solar UV radiation consists of UVA (315-400nm), UVB (280-315nm), and UVC (100-280nm). UVB is most damaging to electrical materials, causing polymer chain scission and material degradation.
                </p>
                <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-lg font-bold text-amber-400 mb-1">UVA</div>
                    <p className="text-xs">Long-term degradation</p>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-lg font-bold text-amber-400 mb-1">UVB</div>
                    <p className="text-xs">Primary damage cause</p>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-lg font-bold text-amber-400 mb-1">UVC</div>
                    <p className="text-xs">Filtered by atmosphere</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-card border border-border/30 rounded-lg">
                  <h5 className="font-medium text-emerald-400 mb-3">UV Damage Mechanisms and Effects</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="font-medium text-foreground mb-2">Chemical Changes</h6>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong>Polymer chain scission:</strong> Breaking of molecular bonds</li>
                        <li>• <strong>Cross-linking:</strong> Formation of brittle polymer networks</li>
                        <li>• <strong>Plasticiser loss:</strong> Migration of flexibility additives</li>
                        <li>• <strong>Oxidation:</strong> Reaction with atmospheric oxygen</li>
                        <li>• <strong>Colour degradation:</strong> Fading and discolouration</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-medium text-foreground mb-2">Physical Manifestations</h6>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong>Surface chalking:</strong> White powdery residue formation</li>
                        <li>• <strong>Cracking:</strong> Stress-induced fractures</li>
                        <li>• <strong>Embrittlement:</strong> Loss of flexibility and impact resistance</li>
                        <li>• <strong>Surface erosion:</strong> Material loss from surface layers</li>
                        <li>• <strong>Dimensional changes:</strong> Shrinkage and warping</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-card border border-border/30 rounded-lg">
                  <h5 className="font-medium text-emerald-400 mb-3">Material Vulnerability Assessment</h5>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-border/20 text-sm">
                      <thead>
                        <tr className="bg-card">
                          <th className="border border-border/20 p-3 text-left">Material Type</th>
                          <th className="border border-border/20 p-3 text-left">UV Susceptibility</th>
                          <th className="border border-border/20 p-3 text-left">Degradation Timeline</th>
                          <th className="border border-border/20 p-3 text-left">Protection Required</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border/20 p-3">Standard PVC</td>
                          <td className="border border-border/20 p-3">Very High</td>
                          <td className="border border-border/20 p-3">6-24 months</td>
                          <td className="border border-border/20 p-3">Essential</td>
                        </tr>
                        <tr className="bg-muted/5">
                          <td className="border border-border/20 p-3">UV-Stabilised PVC</td>
                          <td className="border border-border/20 p-3">Moderate</td>
                          <td className="border border-border/20 p-3">5-10 years</td>
                          <td className="border border-border/20 p-3">Recommended</td>
                        </tr>
                        <tr>
                          <td className="border border-border/20 p-3">XLPE</td>
                          <td className="border border-border/20 p-3">Moderate</td>
                          <td className="border border-border/20 p-3">3-7 years</td>
                          <td className="border border-border/20 p-3">Advisable</td>
                        </tr>
                        <tr className="bg-muted/5">
                          <td className="border border-border/20 p-3">LSZH</td>
                          <td className="border border-border/20 p-3">High</td>
                          <td className="border border-border/20 p-3">12-36 months</td>
                          <td className="border border-border/20 p-3">Essential</td>
                        </tr>
                        <tr>
                          <td className="border border-border/20 p-3">Rubber (EPDM)</td>
                          <td className="border border-border/20 p-3">Low</td>
                          <td className="border border-border/20 p-3">10-20 years</td>
                          <td className="border border-border/20 p-3">Optional</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-4 bg-card border border-green-400/30 rounded-lg">
                  <h5 className="font-medium text-green-400 mb-3">UV Protection Strategies</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="font-medium text-foreground mb-2">Material Selection</h6>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong>UV-stabilised compounds:</strong> Carbon black, UV absorbers</li>
                        <li>• <strong>Pigmented materials:</strong> Titanium dioxide protection</li>
                        <li>• <strong>Black cables:</strong> Carbon black provides natural UV protection</li>
                        <li>• <strong>Alternative polymers:</strong> EPDM, fluoropolymers</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-medium text-foreground mb-2">Physical Protection</h6>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong>Conduit systems:</strong> PVC, steel, aluminium protection</li>
                        <li>• <strong>Trunking installation:</strong> Complete UV shielding</li>
                        <li>• <strong>Underground routing:</strong> Below-ground installation</li>
                        <li>• <strong>Shading structures:</strong> Canopies and covers</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[0]} />
          <Separator className="my-6" />

          {/* 2. Temperature Risks */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Thermometer className="w-5 h-5" /> 2. Temperature Risks - Thermal Effects and Protection
            </h3>
            
            <div className="mb-6">
              <h4 className="font-medium text-foreground mb-3">Temperature Impact Mechanisms</h4>
              
              <div className="space-y-4">
                <div className="p-4 bg-card border border-border/30 rounded-lg">
                  <h5 className="font-medium text-emerald-400 mb-3">High Temperature Effects</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="font-medium text-foreground mb-2">Insulation Degradation</h6>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong>Thermal aging:</strong> Accelerated polymer breakdown</li>
                        <li>• <strong>Plasticiser migration:</strong> Loss of cable flexibility</li>
                        <li>• <strong>Oxidation acceleration:</strong> Chemical degradation rate increase</li>
                        <li>• <strong>Dielectric breakdown:</strong> Reduced insulation resistance</li>
                        <li>• <strong>Conductor annealing:</strong> Reduced mechanical strength</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-medium text-foreground mb-2">Electrical Performance Impact</h6>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong>Increased resistance:</strong> Higher losses and heating</li>
                        <li>• <strong>Reduced current capacity:</strong> Derating requirements</li>
                        <li>• <strong>Thermal runaway risk:</strong> Progressive overheating</li>
                        <li>• <strong>Connection loosening:</strong> Thermal expansion effects</li>
                        <li>• <strong>Arc fault risk:</strong> Degraded insulation performance</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-card border border-border/30 rounded-lg">
                  <h5 className="font-medium text-emerald-400 mb-3">Low Temperature Effects</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="font-medium text-foreground mb-2">Material Embrittlement</h6>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong>PVC embrittlement:</strong> Below 0°C becomes brittle</li>
                        <li>• <strong>Rubber hardening:</strong> Loss of flexibility</li>
                        <li>• <strong>Crack initiation:</strong> Stress concentration effects</li>
                        <li>• <strong>Impact sensitivity:</strong> Increased damage susceptibility</li>
                        <li>• <strong>Installation difficulties:</strong> Handling and bending issues</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-medium text-foreground mb-2">Thermal Cycling Damage</h6>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong>Expansion/contraction:</strong> Mechanical stress cycles</li>
                        <li>• <strong>Joint loosening:</strong> Thermal expansion mismatch</li>
                        <li>• <strong>Fatigue cracking:</strong> Repeated stress application</li>
                        <li>• <strong>Seal degradation:</strong> O-ring and gasket failure</li>
                        <li>• <strong>Moisture ingress:</strong> Through thermal cracks</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-card border border-border/30 rounded-lg">
                  <h5 className="font-medium text-emerald-400 mb-3">BS 7671 Temperature Requirements and Derating</h5>
                  <div className="space-y-3">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-border/20 text-sm">
                        <thead>
                          <tr className="bg-card">
                            <th className="border border-border/20 p-3 text-left">Ambient Temperature</th>
                            <th className="border border-border/20 p-3 text-left">Derating Factor (Ca)</th>
                            <th className="border border-border/20 p-3 text-left">Application</th>
                            <th className="border border-border/20 p-3 text-left">Special Considerations</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-border/20 p-3">30°C</td>
                            <td className="border border-border/20 p-3">1.00</td>
                            <td className="border border-border/20 p-3">Standard reference</td>
                            <td className="border border-border/20 p-3">Base rating condition</td>
                          </tr>
                          <tr className="bg-muted/5">
                            <td className="border border-border/20 p-3">35°C</td>
                            <td className="border border-border/20 p-3">0.94</td>
                            <td className="border border-border/20 p-3">Warm climates</td>
                            <td className="border border-border/20 p-3">6% capacity reduction</td>
                          </tr>
                          <tr>
                            <td className="border border-border/20 p-3">40°C</td>
                            <td className="border border-border/20 p-3">0.87</td>
                            <td className="border border-border/20 p-3">Hot environments</td>
                            <td className="border border-border/20 p-3">13% capacity reduction</td>
                          </tr>
                          <tr className="bg-muted/5">
                            <td className="border border-border/20 p-3">45°C</td>
                            <td className="border border-border/20 p-3">0.79</td>
                            <td className="border border-border/20 p-3">Very hot areas</td>
                            <td className="border border-border/20 p-3">21% capacity reduction</td>
                          </tr>
                          <tr>
                            <td className="border border-border/20 p-3">50°C</td>
                            <td className="border border-border/20 p-3">0.71</td>
                            <td className="border border-border/20 p-3">Extreme heat</td>
                            <td className="border border-border/20 p-3">29% capacity reduction</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-3 bg-card border border-amber-400/30 rounded-lg">
                        <h6 className="font-medium text-amber-400 mb-2">Cable Temperature Ratings</h6>
                        <ul className="space-y-1 text-sm">
                          <li>• <strong>PVC 70°C:</strong> Standard domestic/commercial</li>
                          <li>• <strong>XLPE 90°C:</strong> Higher temperature applications</li>
                          <li>• <strong>EPR 90°C:</strong> Flexible high-temperature cables</li>
                          <li>• <strong>Silicone 180°C:</strong> Extreme temperature applications</li>
                        </ul>
                      </div>
                      <div className="p-3 bg-card border border-green-400/30 rounded-lg">
                        <h6 className="font-medium text-green-400 mb-2">Thermal Protection Methods</h6>
                        <ul className="space-y-1 text-sm">
                          <li>• <strong>Thermal barriers:</strong> Insulation and heat shields</li>
                          <li>• <strong>Ventilation systems:</strong> Forced air cooling</li>
                          <li>• <strong>Heat sinks:</strong> Thermal dissipation enhancement</li>
                          <li>• <strong>Route planning:</strong> Avoiding heat sources</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[1]} />
          <Separator className="my-6" />

          {/* 3. Mechanical Damage */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Hammer className="w-5 h-5" /> 3. Mechanical Damage - Impact, Abrasion, and Protection
            </h3>
            
            <div className="mb-6">
              <h4 className="font-medium text-foreground mb-3">Mechanical Damage Mechanisms</h4>
              
              <div className="space-y-4">
                <div className="p-4 bg-card border border-border/30 rounded-lg">
                  <h5 className="font-medium text-emerald-400 mb-3">Types of Mechanical Damage</h5>
                  <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                    <div>
                      <h6 className="font-medium text-foreground mb-2">Impact Damage</h6>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong>Direct strikes:</strong> Tools, vehicles, falling objects</li>
                        <li>• <strong>Installation damage:</strong> Crushing during installation</li>
                        <li>• <strong>Operational impacts:</strong> Moving machinery contact</li>
                        <li>• <strong>Maintenance damage:</strong> Accidental contact during work</li>
                        <li>• <strong>Vandalism:</strong> Deliberate damage attempts</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-medium text-foreground mb-2">Abrasion Damage</h6>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong>Edge cutting:</strong> Sharp metal edges</li>
                        <li>• <strong>Vibration wear:</strong> Constant movement friction</li>
                        <li>• <strong>Rodent damage:</strong> Animal chewing and gnawing</li>
                        <li>• <strong>Environmental wear:</strong> Sand and debris abrasion</li>
                        <li>• <strong>Cable-to-cable friction:</strong> Bundle movement wear</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-medium text-foreground mb-2">Crushing Forces</h6>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong>Compression loads:</strong> Heavy equipment weight</li>
                        <li>• <strong>Clamp damage:</strong> Over-tightened supports</li>
                        <li>• <strong>Cable tray overload:</strong> Excessive cable weight</li>
                        <li>• <strong>Building settlement:</strong> Structural movement</li>
                        <li>• <strong>Installation stress:</strong> Excessive pulling forces</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-card border border-border/30 rounded-lg">
                  <h5 className="font-medium text-emerald-400 mb-3">Mechanical Protection Systems</h5>
                  <div className="space-y-3">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-border/20 text-sm">
                        <thead>
                          <tr className="bg-card">
                            <th className="border border-border/20 p-3 text-left">Protection Method</th>
                            <th className="border border-border/20 p-3 text-left">Impact Rating</th>
                            <th className="border border-border/20 p-3 text-left">Applications</th>
                            <th className="border border-border/20 p-3 text-left">Limitations</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-border/20 p-3">SWA Cable</td>
                            <td className="border border-border/20 p-3">Very High</td>
                            <td className="border border-border/20 p-3">Underground, industrial</td>
                            <td className="border border-border/20 p-3">Higher cost, weight</td>
                          </tr>
                          <tr className="bg-muted/5">
                            <td className="border border-border/20 p-3">Steel Conduit</td>
                            <td className="border border-border/20 p-3">High</td>
                            <td className="border border-border/20 p-3">Harsh environments</td>
                            <td className="border border-border/20 p-3">Corrosion risk</td>
                          </tr>
                          <tr>
                            <td className="border border-border/20 p-3">Heavy Gauge Trunking</td>
                            <td className="border border-border/20 p-3">High</td>
                            <td className="border border-border/20 p-3">Industrial distribution</td>
                            <td className="border border-border/20 p-3">Access requirements</td>
                          </tr>
                          <tr className="bg-muted/5">
                            <td className="border border-border/20 p-3">PVC Conduit</td>
                            <td className="border border-border/20 p-3">Medium</td>
                            <td className="border border-border/20 p-3">Light commercial</td>
                            <td className="border border-border/20 p-3">Impact limitations</td>
                          </tr>
                          <tr>
                            <td className="border border-border/20 p-3">Cable Ladder</td>
                            <td className="border border-border/20 p-3">Low</td>
                            <td className="border border-border/20 p-3">Controlled environments</td>
                            <td className="border border-border/20 p-3">Open design</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-3 bg-card border border-green-400/30 rounded-lg">
                        <h6 className="font-medium text-green-400 mb-2">Installation Best Practices</h6>
                        <ul className="space-y-1 text-sm">
                          <li>• <strong>Route planning:</strong> Avoid high-risk areas</li>
                          <li>• <strong>Adequate support:</strong> Prevent cable sag and stress</li>
                          <li>• <strong>Bend radius compliance:</strong> Prevent stress concentration</li>
                          <li>• <strong>Segregation:</strong> Separate from mechanical hazards</li>
                          <li>• <strong>Warning systems:</strong> Identification and marking</li>
                        </ul>
                      </div>
                      <div className="p-3 bg-card border border-border/30 rounded-lg">
                        <h6 className="font-medium text-emerald-400 mb-2">Protective Hardware</h6>
                        <ul className="space-y-1 text-sm">
                          <li>• <strong>Grommets:</strong> Edge protection at entry points</li>
                          <li>• <strong>Bushings:</strong> Smooth cable transitions</li>
                          <li>• <strong>Guard rails:</strong> Impact barriers</li>
                          <li>• <strong>Covers and shields:</strong> Physical protection</li>
                          <li>• <strong>Anti-rodent mesh:</strong> Animal protection</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-card border border-amber-400/30 rounded-lg">
                  <h5 className="font-medium text-amber-400 mb-3">Risk Assessment and Protection Selection</h5>
                  <div className="space-y-3">
                    <div className="p-3 bg-card border border-border/20 rounded-lg">
                      <h6 className="font-medium text-foreground mb-2">Mechanical Risk Assessment Matrix</h6>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm mb-2"><strong>High Risk Environments:</strong></p>
                          <ul className="space-y-1 text-sm">
                            <li>• Construction sites and workshops</li>
                            <li>• Vehicle movement areas</li>
                            <li>• Manufacturing with heavy machinery</li>
                            <li>• Agricultural installations</li>
                            <li>• Public access areas</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm mb-2"><strong>Protection Requirements:</strong></p>
                          <ul className="space-y-1 text-sm">
                            <li>• SWA cables or steel conduit mandatory</li>
                            <li>• Impact protection barriers</li>
                            <li>• Regular inspection schedules</li>
                            <li>• Emergency isolation systems</li>
                            <li>• Clear hazard identification</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[2]} />
          <Separator className="my-6" />

          {/* 4. BS 7671 Requirements and Compliance */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5" /> 4. BS 7671 Requirements and Environmental Assessment
            </h3>

            <div className="space-y-4">
              <div className="p-4 bg-card border border-border/30 rounded-lg">
                <h5 className="font-medium text-emerald-400 mb-3">Regulatory Requirements</h5>
                <ul className="space-y-2 text-sm">
                  <li><strong>Section 512:</strong> Environmental conditions must be assessed during design</li>
                  <li><strong>Section 522:</strong> Cable selection must account for environmental influences</li>
                  <li><strong>Section 526:</strong> Connections must be suitable for environmental conditions</li>
                  <li><strong>Appendix 4:</strong> Current-carrying capacity tables include derating factors</li>
                  <li><strong>Section 134:</strong> Installation methods must prevent damage</li>
                </ul>
              </div>

              <div className="p-4 bg-card border border-green-400/30 rounded-lg">
                <h5 className="font-medium text-green-400 mb-3">Documentation and Verification</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Design Phase Documentation</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• Environmental condition assessment</li>
                      <li>• Material selection justification</li>
                      <li>• Protection method specification</li>
                      <li>• Derating calculations</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Installation Verification</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• Protection integrity inspection</li>
                      <li>• Environmental condition monitoring</li>
                      <li>• Periodic assessment schedules</li>
                      <li>• Maintenance requirement documentation</li>
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
              <h3 className="font-medium text-amber-400 mb-3">Case Study 1: Car Park Lighting UV Failure</h3>
              <p className="text-xs sm:text-sm text-foreground mb-3">
                <strong>Situation:</strong> An outdoor lighting system in a car park used standard PVC cable exposed to direct sunlight without UV protection.
              </p>
              <p className="text-xs sm:text-sm text-foreground mb-3">
                <strong>Failure Mode:</strong> Within two years, the cable sheath became brittle and cracked, leading to moisture ingress and RCD tripping.
              </p>
              <p className="text-xs sm:text-sm text-foreground">
                <strong>Solution:</strong> Replacement with UV-resistant SWA cables routed in steel conduit provided complete protection and eliminated future UV damage risks.
              </p>
            </div>

            <div className="p-4 bg-card border border-border/30 rounded-lg">
              <h3 className="font-medium text-emerald-400 mb-3">Case Study 2: Industrial Oven Temperature Damage</h3>
              <p className="text-xs sm:text-sm text-foreground mb-3">
                <strong>Challenge:</strong> Power cables routed near industrial ovens experienced regular overheating despite being rated for ambient conditions.
              </p>
              <p className="text-xs sm:text-sm text-foreground mb-3">
                <strong>Analysis:</strong> Radiant heat from ovens raised local ambient temperature to 60°C, exceeding cable ratings and causing insulation breakdown.
              </p>
              <p className="text-xs sm:text-sm text-foreground">
                <strong>Resolution:</strong> Installation of heat shields and upgrade to high-temperature rated cables (180°C) with appropriate derating provided reliable operation.
              </p>
            </div>

            <div className="p-4 bg-card border border-green-400/30 rounded-lg">
              <h3 className="font-medium text-green-400 mb-3">Case Study 3: Construction Site Mechanical Damage</h3>
              <p className="text-xs sm:text-sm text-foreground mb-3">
                <strong>Problem:</strong> Temporary electrical installation on construction site suffered repeated cable damage from vehicle traffic and construction equipment.
              </p>
              <p className="text-xs sm:text-sm text-foreground mb-3">
                <strong>Impact:</strong> Multiple power outages, safety incidents, and project delays due to electrical system failures.
              </p>
              <p className="text-xs sm:text-sm text-foreground">
                <strong>Solution:</strong> Implementation of buried SWA cables with impact-resistant route marking and overhead cable protection systems eliminated damage incidents.
              </p>
            </div>
          </div>
        </Card>

        {/* Enhanced FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="p-4 bg-card border border-border/20 rounded-lg">
              <h3 className="font-medium text-foreground mb-2">Q: Can mechanical damage occur in domestic properties?</h3>
              <p className="text-xs sm:text-sm text-foreground">
                A: Yes — common examples include loft storage crushing cables, kitchen appliances damaging wiring behind units, and garden maintenance cutting outdoor cables. Protection measures should be proportionate to risk.
              </p>
            </div>
            <div className="p-4 bg-card border border-border/20 rounded-lg">
              <h3 className="font-medium text-foreground mb-2">Q: Do all cables have UV protection?</h3>
              <p className="text-xs sm:text-sm text-foreground">
                A: No — standard PVC cables degrade rapidly in sunlight unless specifically formulated with UV stabilisers. Always check cable markings for UV resistance or specify UV-rated cables for outdoor use.
              </p>
            </div>
            <div className="p-4 bg-card border border-border/20 rounded-lg">
              <h3 className="font-medium text-foreground mb-2">Q: Is heat damage always obvious?</h3>
              <p className="text-xs sm:text-sm text-foreground">
                A: Not always — insulation may become brittle and lose electrical properties before visible discolouration appears. Regular thermal imaging and electrical testing can detect early degradation.
              </p>
            </div>
            <div className="p-4 bg-card border border-border/20 rounded-lg">
              <h3 className="font-medium text-foreground mb-2">Q: How can I assess the mechanical damage risk for my installation?</h3>
              <p className="text-xs sm:text-sm text-foreground">
                A: Consider vehicle movement, foot traffic, machinery operation, construction activity, and public access. Document potential impact sources and select protection accordingly using BS 7671 influence codes.
              </p>
            </div>
            <div className="p-4 bg-card border border-border/20 rounded-lg">
              <h3 className="font-medium text-foreground mb-2">Q: What's the difference between derating and cable upgrade?</h3>
              <p className="text-xs sm:text-sm text-foreground">
                A: Derating reduces the current capacity of existing cables for environmental conditions, while upgrading selects cables with higher temperature ratings. Both approaches ensure safe operation.
              </p>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Summary</h2>
          <p className="text-foreground/90">
            UV radiation, temperature extremes, and mechanical forces pose significant threats to electrical installations. Understanding these degradation mechanisms and implementing appropriate protective measures through material selection, installation techniques, and environmental design ensures safety, compliance with BS 7671, and long-term reliability. Regular assessment and maintenance preserve protection effectiveness throughout the installation lifecycle.
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
            <Link to="../5-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: IP Ratings and Protection
            </Link>
          </Button>
          <Button asChild>
            <Link to="../5-4">
              Next: Subsection 5.4
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}